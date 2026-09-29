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

  /* currentSession is kept in sync by onAuthStateChange and is the single
     source of truth every page/script should read from after `ready`
     resolves — never call client.auth.getSession() again on a page that
     already has auth.js loaded. */
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

    document.dispatchEvent(
      new CustomEvent("vexdyn:auth-nav-rendered", {
        detail: { session: session }
      })
    );
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

  /* ---------- Password recovery safety net ---------- */

  function handlePasswordRecoveryRedirect(session) {
    if (!session) return;

    var path = window.location.pathname || "";
    var fileName = path.substring(path.lastIndexOf("/") + 1).toLowerCase();

    // reset-password.html (legacy link-based flow) and forgot-password.html
    // (new inline OTP flow, Step 2) both listen for PASSWORD_RECOVERY
    // themselves and handle it in place. Only redirect away from every
    // OTHER page, so an out-of-band recovery session never strands someone
    // on an unrelated page with no way to actually change their password.
    if (fileName === "reset-password.html") return;
    if (fileName === "forgot-password.html") return;

    window.location.replace("/reset-password.html");
  }

  /* ---------- Central auth-state handling ----------
     Registered BEFORE anything else touches the client, so no event is
     ever missed. supabase-js fires this once immediately on subscribe
     with the restored (or null) session — that first call is what
     resolves `ready`. Every subsequent event keeps currentSession and
     the nav in sync for the lifetime of the page. */
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
        handlePasswordRecoveryRedirect(session);
        break;

      default:
        currentSession = session;
        renderNav(session);
    }
  });

  /* Do not race INITIAL_SESSION with a separate getSession() call here.
     `INITIAL_SESSION` is the authoritative first auth-state event after
     Supabase has restored persisted storage and processed any recovery URL.
     Resolving `ready` from a concurrent getSession() can return null before
     that restore finishes, which can make a valid recovery session look
     logged out on the next page. */

  window.vexdynAuth = {
    client: client,

    /* Resolves once with the session that was valid at page load
       (or null). Await this before deciding logged-in/out UI —
       never call client.auth.getSession() again yourself. */
    ready: readyPromise,

    /* Synchronous snapshot for use AFTER `ready` has resolved
       (e.g. inside a later click handler). Returns null before
       `ready` resolves. */
    getSession: function () {
      return currentSession;
    }
  };

  /* Delegated so it works for any current or future [data-pw-toggle-for]
     button without each page needing its own script. Toggles only the
     input's type attribute — never reads, stores, or transmits the
     value itself. */
  function wirePasswordToggles() {
    document.addEventListener("click", function (e) {
      var btn = e.target.closest ? e.target.closest("[data-pw-toggle-for]") : null;
      if (!btn) return;

      e.preventDefault();

      var input = document.getElementById(
        btn.getAttribute("data-pw-toggle-for")
      );

      if (!input) return;

      var showing = input.type === "text";

      input.type = showing ? "password" : "text";

      btn.setAttribute("aria-pressed", showing ? "false" : "true");
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
