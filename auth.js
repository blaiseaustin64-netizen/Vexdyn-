/* ============================================
   VEXDYN — Central Authentication (Supabase)
   Shared across every page. Loaded after the
   Supabase UMD bundle, before any page-specific
   auth script.

   This is the ONLY place the Supabase client is
   created. Every other script (login.html,
   signup.html, account.html, etc.) reads it from
   window.vexdynAuth.client — never re-create it.
   ============================================ */
(function () {
  "use strict";

  var SUPABASE_URL = "https://ymzapatkttkkbpxmqiia.supabase.co";
  var SUPABASE_ANON_KEY = "sb_publishable_qIY6mKkgfXvq0GmycriAlw_Sr3Fz2v4";

  if (!window.supabase || typeof window.supabase.createClient !== "function") {
    console.error("VEXDYN Auth: Supabase library did not load. Check network/CDN access.");
    window.vexdynAuth = { client: null };
    return;
  }

  var client = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true
    }
  });

  window.vexdynAuth = { client: client };

  /* ---------- Nav rendering (logged in vs logged out) ---------- */

  function loggedOutDesktopHTML() {
    return (
      '<a href="login.html" class="auth-link">Sign In</a>' +
      '<a href="signup.html" class="btn btn-primary btn-sm">Create Account</a>'
    );
  }
  function loggedInDesktopHTML() {
    return (
      '<a href="account.html" class="auth-link">Account</a>' +
      '<button type="button" class="btn btn-secondary btn-sm" data-auth-logout>Logout</button>'
    );
  }
  function loggedOutMobileHTML() {
    return (
      '<a href="login.html">Sign In</a>' +
      '<a href="signup.html">Create Account</a>'
    );
  }
  function loggedInMobileHTML() {
    return (
      '<a href="account.html">Account</a>' +
      '<button type="button" data-auth-logout>Logout</button>'
    );
  }

  function renderNav(session) {
    var desktopSlots = document.querySelectorAll("#authNav");
    var mobileSlots = document.querySelectorAll("#authNavMobile");
    var isLoggedIn = !!session;

    desktopSlots.forEach(function (slot) {
      slot.innerHTML = isLoggedIn ? loggedInDesktopHTML() : loggedOutDesktopHTML();
    });
    mobileSlots.forEach(function (slot) {
      slot.innerHTML = isLoggedIn ? loggedInMobileHTML() : loggedOutMobileHTML();
    });

    document.dispatchEvent(new CustomEvent("vexdyn:auth-nav-rendered", { detail: { session: session } }));
  }

  function wireLogout() {
    document.addEventListener("click", function (e) {
      var btn = e.target.closest ? e.target.closest("[data-auth-logout]") : null;
      if (!btn) return;
      e.preventDefault();
      btn.disabled = true;
      client.auth.signOut().finally(function () {
        window.location.href = "index.html";
      });
    });
  }

  /* Fires on initial load, on sign-in, sign-out, token refresh, and
     password-recovery — keeps every open tab/page in sync. */
  client.auth.onAuthStateChange(function (_event, session) {
    renderNav(session);
  });

  function init() {
    wireLogout();
    client.auth.getSession().then(function (result) {
      renderNav(result && result.data ? result.data.session : null);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
