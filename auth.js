/* ============================================
   VEXDYN — Central Authentication (Supabase)
   Shared across every page. Loaded after the
   Supabase UMD bundle, before any page-specific
   auth script.

   This is the ONLY place the Supabase client is
   created. Every other script (login.html,
   signup.html, account.html, learn.html, etc.)
   reads it from window.vexdynAuth.client — never
   re-create it, and never call getSession() as the
   first thing on page load — await
   window.vexdynAuth.ready instead (see below).
   This is what prevents the "sometimes logged
   out on revisit" race: every page now waits on
   the SAME resolved session instead of racing
   its own separate getSession() call against the
   client's internal restore-from-storage step.
   ============================================ */
(function () {
  "use strict";

  var SUPABASE_URL = "https://ymzapatkttkkbpxmqiia.supabase.co";
  var SUPABASE_ANON_KEY = "sb_publishable_qIY6mKkgfXvq0GmycriAlw_Sr3Fz2v4";

  if (!window.supabase || typeof window.supabase.createClient !== "function") {
    console.error("VEXDYN Auth: Supabase library did not load. Check network/CDN access.");
    window.vexdynAuth = {
      client: null,
      ready: Promise.resolve(null),
      getSession: function () { return null; }
    };
    return;
  }

  var client = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true
    }
  });

  var currentSession = null;
  var resolveReady;
  var readyPromise = new Promise(function (resolve) { resolveReady = resolve; });
  var readyResolved = false;

  function settleReady(session) {
    currentSession = session;
    if (!readyResolved) {
      readyResolved = true;
      resolveReady(session);
    }
  }

  /* ---------- Nav rendering ---------- */

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

    document.dispatchEvent(
      new CustomEvent("vexdyn:auth-nav-rendered", {
        detail: { session: session }
      })
    );
  }

  function wireLogout() {
    document.addEventListener("click", function (e) {
      var btn = e.target.closest
        ? e.target.closest("[data-auth-logout]")
        : null;

      if (!btn) return;

      e.preventDefault();
      btn.disabled = true;

      client.auth.signOut().finally(function () {
        window.location.href = "index.html";
      });
    });
  }

  /* ---------- Central auth-state handling ---------- */

  client.auth.onAuthStateChange(function (event, session) {
    switch (event) {
      case "INITIAL_SESSION":
        settleReady(session);
        renderNav(session);
        break;

      case "SIGNED_IN":
        currentSession = session;
        renderNav(session);
        break;

      case "SIGNED_OUT":
        currentSession = null;
        renderNav(null);
        break;

      case "TOKEN_REFRESHED":
        currentSession = session;
        break;

      case "USER_UPDATED":
        currentSession = session;
        break;

      case "PASSWORD_RECOVERY":
        currentSession = session;
        break;

      default:
        currentSession = session;
        renderNav(session);
    }
  });

  client.auth.getSession().then(function (result) {
    var session = result && result.data
      ? result.data.session
      : null;

    settleReady(session);
  });

  window.vexdynAuth = {
    client: client,
    ready: readyPromise,
    getSession: function () {
      return currentSession;
    }
  };

  /* ---------- Password visibility ---------- */

  function wirePasswordToggles() {
    document.addEventListener("click", function (e) {
      var btn = e.target.closest
        ? e.target.closest("[data-pw-toggle-for]")
        : null;

      if (!btn) return;

      /*
       * Prevent the eye button from ever submitting its
       * surrounding login/signup form.
       */
      e.preventDefault();

      var input = document.getElementById(
        btn.getAttribute("data-pw-toggle-for")
      );

      if (!input) return;

      var showing = input.type === "text";

      input.type = showing ? "password" : "text";

      btn.setAttribute(
        "aria-pressed",
        showing ? "false" : "true"
      );

      btn.setAttribute(
        "aria-label",
        showing ? "Show password" : "Hide password"
      );
    });
  }

  function init() {
    wireLogout();
    wirePasswordToggles();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
