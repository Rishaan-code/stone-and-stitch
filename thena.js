(function () {
  const VITE_SUPABASE_URL = "https://zlpnoahduwybpxlvdkkk.supabase.co";
  const VITE_SUPABASE_ANON_KEY =
    "sb_publishable_n_SN0AdFezXXS9XNO5pyXQ__eT-DEeY";
  const DEFAULT_BRAND_ID = "646d0ed2-457e-4fb7-af47-bf0915b528ff";
  const brand_logo = "/storage/v1/object/public/brand-assets/thena-logo.png";

  function loadSupabase() {
    return new Promise((resolve, reject) => {
      if (window.supabase) {
        resolve(window.supabase);
        return;
      }

      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";
      script.async = true;

      script.onload = () => resolve(window.supabase);
      script.onerror = reject;

      document.head.appendChild(script);
    });
  }

  function createButton(container) {
    const button = document.createElement("button");
    button.innerText = "Filter with Thena";
    button.id = "thena-filter-btn";

    container.appendChild(button);
    return button;
  }

  function signOutButton(container) {
    const signOut = document.createElement("button");
    signOut.innerText = "Sign Out";
    signOut.id = "sign-out-btn";

    container.appendChild(signOut);
    return signOut;
  }

  function createLoginModal() {
    const overlay = document.createElement("div");
    overlay.id = "thena-login-overlay";

    const box = document.createElement("div");
    box.id = "thena-login-inner";

    const img = document.createElement("img");
    img.id = "thena-img";
    img.src = VITE_SUPABASE_URL + brand_logo;

    const title = document.createElement("h3");
    title.innerText = "Login";
    title.id = "thena-login-title";

    const email = document.createElement("input");
    email.placeholder = "example@email.com";
    email.type = "email";
    email.id = "thena-email-input";

    const password = document.createElement("input");
    password.placeholder = "password";
    password.type = "password";
    password.id = "thena-password-input";

    const errorText = document.createElement("p");
    errorText.innerText = "";
    errorText.id = "thena-error-msg";

    const login = document.createElement("button");
    login.innerText = "Login";
    login.id = "thena-login-btn";

    const bubble1 = document.createElement("div");
    bubble1.className = "thena-bubble large";

    const bubble2 = document.createElement("div");
    bubble2.className = "thena-bubble small";

    const bubble3 = document.createElement("div");
    bubble3.className = "thena-bubble bottom";

    const closeButton = document.createElement("button");
    closeButton.innerText = "x";
    closeButton.id = "thena-close-btn";

    closeButton.onclick = () => {
      overlay.remove();
    };

    box.appendChild(closeButton);

    box.appendChild(bubble1);
    box.appendChild(bubble2);
    box.appendChild(bubble3);

    box.appendChild(img);
    box.appendChild(title);
    box.appendChild(email);
    box.appendChild(password);
    box.appendChild(errorText);
    box.appendChild(login);

    overlay.appendChild(box);
    document.body.appendChild(overlay);

    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) {
        overlay.remove();
      }
    });

    return { overlay, login };
  }

  function cmToInches(cm) {
    return cm / 2.54;
  }

  let supabaseClient;
  async function supabaseLogin() {
    const supabaseURL = VITE_SUPABASE_URL;
    const supabaseAnonKey = VITE_SUPABASE_ANON_KEY;

    const supabaseLib = await loadSupabase();
    supabaseClient = supabaseLib.createClient(supabaseURL, supabaseAnonKey);
  }

  async function supabaseSignOut() {
    const { error } = await supabaseClient.auth.signOut();

    if (error) {
      console.error(error);
      return false;
    }
    return true;
  }

  async function attemptLogin() {
    const errorText = document.getElementById("thena-error-msg");

    const email = document.getElementById("thena-email-input").value;
    const password = document.getElementById("thena-password-input").value;

    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      errorText.innerText = "Invalid email or password.";
      throw new Error("Invalid field(s).");
    }

    const { data: sessionData } = await supabaseClient.auth.getSession();
    const { data: measurements, error: measurementError } = await supabaseClient
      .from("measurements")
      .select("*")
      .eq("user_id", sessionData.session.user.id)
      .maybeSingle();

    if (measurementError) {
      errorText.innerText("Something went wrong. Try again later.");
      // throw new Error("Error fetching data.");
      return [false, null];
    }

    return [true, measurements];
  }

  function findSizeFromChart(measurement, chartArray) {
    const match = chartArray.find(
      (range) => measurement >= range.min && measurement <= range.max,
    );

    return match ? match.size : "Custom";
  }

  function injectIntoUrl({ shirt, pantWaist, pantLength }) {
    const params = new URLSearchParams(window.location.search);

    params.set("shirt", shirt);
    params.set("pantWaist", pantWaist);
    params.set("pantLength", pantLength);
    params.set("filtered", true);

    const hash = window.location.hash || "";

    const newURL = window.location.pathname + "?" + params.toString() + hash;
    window.history.replaceState({}, "", newURL);
  }

  async function convertMeasurementsToSize(measurements, brandId) {
    const chestIn = cmToInches(measurements.chest);
    const waistIn = cmToInches(measurements.waist);
    const inseamIn = cmToInches(measurements.inseam);

    const errorText = document.getElementById("thena-error-msg");

    const { data, error } = await supabaseClient
      .from("sizecharts")
      .select("*")
      .eq("brand_id", brandId)
      .maybeSingle();

    if (error || !data) {
      errorText.innerText = "Could not fetch size charts.";
      return false;
    }

    const shirtSize = findSizeFromChart(chestIn, data.tops);
    const pantWaistSize = findSizeFromChart(waistIn, data.bottoms_width);
    const pantLengthSie = findSizeFromChart(inseamIn, data.bottoms_length);

    const sizes = {
      shirt: shirtSize,
      pantWaist: pantWaistSize,
      pantLength: pantLengthSie,
    };

    injectIntoUrl(sizes);

    return true;
  }

  async function init() {
    const container = document.getElementById("thena");
    if (!container) return;

    const brand_id = container?.getAttribute("brand-id") || DEFAULT_BRAND_ID;

    await supabaseLogin();

    const button = createButton(container);
    const { data } = await supabaseClient.auth.getSession();

    if (data.session) {
      button.innerText = "Filtered by Thena";
      button.disabled = true;
      button.style.cursor = "not-allowed";
      button.id = "thena-filtered-btn";

      const signOut = signOutButton(container);

      signOut.addEventListener("click", async () => {
        const success = await supabaseSignOut();

        const { data } = await supabaseClient.auth.getSession();
        console.log("Session after logout:", data.session);

        if (success || !data.session) {
          button.innerText = "Filter with Thena";
          button.disabled = false;
          button.style.cursor = "pointer";
          button.id = "thena-filter-btn";

          signOut.remove();
        }
      });
    }
    button.addEventListener("click", async () => {
      const { overlay, login } = createLoginModal();

      login.onclick = async () => {
        var res = await attemptLogin();
        if (res[0]) {
          res = convertMeasurementsToSize(res[1], brand_id);

          if (res) {
            button.innerText = "Filtered by Thena";
            button.disabled = true;
            button.style.cursor = "not-allowed";
            button.id = "thena-filtered-btn";
            const signOut = signOutButton(container);
            signOut.addEventListener("click", async () => {
              const success = await supabaseSignOut();

              const { data } = await supabaseClient.auth.getSession();
              console.log("Session after logout:", data.session);

              if (success) {
                button.innerText = "Filter with Thena";
                button.disabled = false;
                button.style.cursor = "pointer";
                button.id = "thena-filter-btn";

                signOut.remove();
              }
            });
            overlay.remove();
          } else {
            overlay.remove();
            Promise((resolve) => {
              setTimeout(resolve, 800);
              overlay.remove();
            });
          }
        } else {
          overlay.remove();
          Promise((resolve) => {
            setTimeout(resolve, 800);
            overlay.remove();
          });
        }
      };
    });
  }

  if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
