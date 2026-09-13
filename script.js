/* ============================================
   VEXDYN — Core Script (Final UI/UX + Intro)
   ============================================ */
(function () {
  "use strict";

  /* Main VEXDYN site uses a fixed graphite/silver/blue identity.
     Theme switching is disabled on the main website. */
  const SEARCH_ITEMS = [
    { title: "Home", desc: "VEXDYN homepage", href: "index.html", keywords: "home start main" },
    { title: "Websites", desc: "Request a professional website", href: "websites.html", keywords: "website websites build service business commerce" },
    { title: "Learn", desc: "Technology learning paths", href: "learn.html", keywords: "learn learning html css javascript python react course" },
    { title: "Lab", desc: "Practice coding challenges", href: "https://vexdyn-labv10.vercel.app/", keywords: "lab practice challenge" },
    { title: "Forge", desc: "Build websites yourself", href: "https://vexdyn-forgev1.vercel.app/", keywords: "forge create builder" },
    { title: "NYVEN", desc: "Intelligence platform", href: "https://nyven-v1.vercel.app/", keywords: "nyven intelligence ai" },
    { title: "VEXDYN+", desc: "Premium access & plans", href: "plus.html", keywords: "plus premium subscription plan pricing" },
    { title: "About", desc: "About VEXDYN & founder", href: "about.html", keywords: "about founder david" },
    { title: "Contact", desc: "Get in touch", href: "contact.html", keywords: "contact email phone message" },
    { title: "Build", desc: "Build for me or yourself", href: "build.html", keywords: "build request website" }
  ];

  function initTheme() {
    /* Fixed visual identity — clear any legacy theme attribute */
    document.documentElement.removeAttribute("data-theme");
    try { localStorage.removeItem("vexdyn-theme"); } catch {}
    document.querySelectorAll(".logo-swap").forEach((img) => {
      if (!img.src.includes("vexdyn-logo-wordmark") && !img.src.includes("wordmark")) {
        img.src = "vexdyn-logo-wordmark-alpha.png";
      }
    });
  }

  function initNav() {
    const toggle = document.getElementById("menuToggle");
    const nav = document.getElementById("navMobile");
    if (!toggle || !nav) return;
    toggle.addEventListener("click", () => {
      toggle.classList.toggle("open");
      nav.classList.toggle("open");
      document.body.style.overflow = nav.classList.contains("open") ? "hidden" : "";
    });
    nav.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => {
        toggle.classList.remove("open");
        nav.classList.remove("open");
        document.body.style.overflow = "";
      });
    });
  }

  /* ---- SEARCH ---- */
  function closeSearch() {
    const overlay = document.getElementById("searchOverlay");
    if (overlay) {
      overlay.classList.remove("open");
      document.body.style.overflow = "";
    }
  }

  function openSearch() {
    const overlay = document.getElementById("searchOverlay");
    const input = document.getElementById("searchInput");
    if (!overlay) return;
    overlay.classList.add("open");
    document.body.style.overflow = "hidden";
    setTimeout(() => { if (input) input.focus(); }, 120);
    renderSearchResults("");
  }

  function renderSearchResults(query) {
    const list = document.getElementById("searchResults");
    if (!list) return;
    const q = (query || "").trim().toLowerCase();
    const matches = q
      ? SEARCH_ITEMS.filter((item) =>
          item.title.toLowerCase().includes(q) ||
          item.desc.toLowerCase().includes(q) ||
          item.keywords.includes(q)
        )
      : SEARCH_ITEMS;

    if (!matches.length) {
      list.innerHTML = '<div class="search-empty">No results found</div>';
      return;
    }
    list.innerHTML = matches.map((item) =>
      `<a href="${item.href}" class="search-result">
        <div class="search-result-title">${item.title}</div>
        <div class="search-result-desc">${item.desc}</div>
      </a>`
    ).join("");
  }

  function initSearch() {
    // Search UI removed from VEXDYN
    return;
    const btn = document.getElementById("cmdBtn");
    const overlay = document.getElementById("searchOverlay");
    const input = document.getElementById("searchInput");
    const closeBtn = document.getElementById("searchClose");
    if (!btn || !overlay) return;

    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      openSearch();
      const theme = document.getElementById("themePanel");
      if (theme) theme.classList.remove("open");
    });

    if (closeBtn) closeBtn.addEventListener("click", closeSearch);
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) closeSearch();
    });

    if (input) {
      input.addEventListener("input", () => renderSearchResults(input.value));
      input.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeSearch();
      });
    }

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeSearch();
    });
  }

  /* ---- CINEMATIC INTRO ---- */
  function initLoader() {
    const overlay = document.getElementById("loader");
    if (!overlay) {
      document.body.classList.add("loaded");
      return;
    }

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let isFirstVisit = true;
    try {
      isFirstVisit = localStorage.getItem("vexdyn-visited") !== "1";
    } catch {}

    if (prefersReduced) {
      try { localStorage.setItem("vexdyn-visited", "1"); } catch {}
      overlay.classList.add("done");
      document.body.classList.add("loaded");
      return;
    }

    const symbol = document.getElementById("loaderSymbol");
    const lockup = document.getElementById("loaderLockup");
    const sweep = document.getElementById("loaderSweep");
    const system = document.getElementById("loaderSystem");
    const sysMsg = document.getElementById("loaderSysMsg");
    const progressFill = document.getElementById("loaderProgressFill");
    const finalMsg = document.getElementById("loaderFinal");
    const line1 = document.getElementById("loaderLine1");
    const line2 = document.getElementById("loaderLine2");

    const messages = [
      "INITIALIZING CORE",
      "SYNCING INTERFACE",
      "CALIBRATING ENVIRONMENT",
      "LOADING DIGITAL SYSTEM",
      "ESTABLISHING CONNECTION",
      "SYSTEM READY"
    ];

    function finish() {
      try { localStorage.setItem("vexdyn-visited", "1"); } catch {}
      overlay.classList.add("done");
      document.body.classList.add("loaded");
    }

    // RETURNING VISITOR — no loader, home immediately
    if (!isFirstVisit) {
      overlay.classList.add("done");
      overlay.style.display = "none";
      document.body.classList.add("loaded");
      return;
    }

    // FIRST VISIT — full cinematic sequence (max ~9s)
    let msgIndex = 0;
    let progress = 0;

    // 1. Symbol appears
    setTimeout(() => {
      if (symbol) symbol.classList.add("visible");
    }, 300);

    // 2. Silver metallic sweep
    setTimeout(() => {
      if (sweep) sweep.classList.add("active");
    }, 1400);

    // 3. Hide symbol, show lockup
    setTimeout(() => {
      if (symbol) {
        symbol.classList.add("hide");
        symbol.classList.remove("visible");
      }
    }, 2400);

    setTimeout(() => {
      if (lockup) lockup.classList.add("visible");
    }, 2700);

    // 4. System initialization
    setTimeout(() => {
      if (lockup) lockup.classList.add("dim");
      if (system) system.classList.add("visible");
    }, 3800);

    // Progress + rotating messages
    const progressInterval = setInterval(() => {
      progress += 1.8;
      if (progress > 100) progress = 100;
      if (progressFill) progressFill.style.width = progress + "%";
    }, 80);

    const msgInterval = setInterval(() => {
      if (sysMsg && msgIndex < messages.length) {
        sysMsg.style.opacity = "0";
        setTimeout(() => {
          sysMsg.textContent = messages[msgIndex];
          sysMsg.style.opacity = "1";
          msgIndex++;
        }, 180);
      }
    }, 700);

    // 5. Final message
    setTimeout(() => {
      clearInterval(progressInterval);
      clearInterval(msgInterval);
      if (progressFill) progressFill.style.width = "100%";
      if (system) system.classList.add("hide");
      if (lockup) lockup.classList.add("hide");
      if (finalMsg) finalMsg.classList.add("visible");
      setTimeout(() => { if (line1) line1.classList.add("visible"); }, 100);
      setTimeout(() => { if (line2) line2.classList.add("visible"); }, 500);
    }, 7200);

    // 6. Exit to homepage
    setTimeout(finish, 9200);
  }

  /* ---- REVEAL + PROCESS STAGGER ---- */
  function initReveal() {
    const els = document.querySelectorAll(".reveal");
    if (!els.length) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      els.forEach((el) => el.classList.add("visible"));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });
    els.forEach((el) => io.observe(el));
  }

  function initProcessStagger() {
    const track = document.getElementById("processTrack");
    if (!track) return;
    const cards = track.querySelectorAll(".process-card");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      cards.forEach((card) => card.classList.add("stagger-in"));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          cards.forEach((card, i) => {
            setTimeout(() => card.classList.add("stagger-in"), i * 120);
          });
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.15 });
    io.observe(track);
  }

  function animateProgress(el, target) {
    const fill = el.querySelector(".progress-fill");
    const num = el.querySelector(".progress-num");
    if (!fill || !num) return;
    const duration = 1500;
    const start = performance.now();
    function tick(now) {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const current = Math.round(eased * target);
      fill.style.width = current + "%";
      num.textContent = current + "%";
      if (t < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  function initProgress() {
    const cards = document.querySelectorAll(".learn-card[data-progress]");
    if (!cards.length) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const target = parseInt(e.target.dataset.progress, 10) || 0;
          animateProgress(e.target, target);
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.28 });
    cards.forEach((c) => io.observe(c));
  }

  function initPricing() {
    const toggle = document.getElementById("pricingToggle");
    const monthlyBtn = document.getElementById("toggleMonthly");
    const yearlyBtn = document.getElementById("toggleYearly");
    const amountEl = document.getElementById("plusAmount");
    const periodEl = document.getElementById("plusPeriod");
    const saveEl = document.getElementById("plusSave");
    if (!monthlyBtn || !yearlyBtn || !amountEl) return;

    const prices = {
      monthly: { amount: "₦4,999", period: "/ month", save: "" },
      yearly: { amount: "₦49,990", period: "/ year", save: "Save ~17%" }
    };

    function setPlan(plan) {
      monthlyBtn.classList.toggle("active", plan === "monthly");
      yearlyBtn.classList.toggle("active", plan === "yearly");
      if (toggle) toggle.classList.toggle("yearly", plan === "yearly");
      amountEl.style.opacity = "0";
      amountEl.style.transform = "translateY(5px)";
      setTimeout(() => {
        amountEl.textContent = prices[plan].amount;
        if (periodEl) periodEl.textContent = prices[plan].period;
        if (saveEl) {
          saveEl.textContent = prices[plan].save;
          saveEl.style.visibility = prices[plan].save ? "visible" : "hidden";
        }
        amountEl.style.opacity = "1";
        amountEl.style.transform = "translateY(0)";
      }, 160);
    }

    monthlyBtn.addEventListener("click", () => setPlan("monthly"));
    yearlyBtn.addEventListener("click", () => setPlan("yearly"));
  }

  
  /* ---- CODE → LANGUAGE TRANSFORM ---- */
  const CODE_CHARS = "01ABCDEFXVYZ#@$%&*+=";
  const MESSAGES = [
    "BUILD YOUR CUSTOM WEB",
    "LEARN THE TOOLS OF TOMORROW",
    "TURN IDEAS INTO DIGITAL REALITY",
    "CREATE. DESIGN. DEVELOP. LAUNCH.",
    "EXPLORE THE NEXT GENERATION OF TECH",
    "YOUR DIGITAL FUTURE STARTS HERE."
  ];

  function initCodeTransform() {
    const el = document.getElementById("codeTransform");
    if (!el) return;

    let msgIndex = 0;
    let phase = "scramble";
    let frame = 0;
    let target = MESSAGES[0];
    /* Desktop: snappier transition; hold ~5s for readability.
       Mobile: keep smooth moderate timing. */
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    const SCRAMBLE = isDesktop ? 18 : 26;
    const MORPH = isDesktop ? 20 : 30;
    const HOLD = isDesktop ? 300 : 240; /* ~5s desktop, ~4s mobile at 60fps */
    const DISSOLVE = isDesktop ? 16 : 22;

    function randChar() {
      return CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)];
    }

    function scrambleStr(len) {
      let s = "";
      for (let i = 0; i < len; i++) s += randChar();
      return s;
    }

    function loop() {
      frame++;
      if (phase === "scramble") {
        el.textContent = scrambleStr(Math.max(target.length, 22));
        el.classList.remove("resolved");
        if (frame >= SCRAMBLE) { phase = "morph"; frame = 0; }
      } else if (phase === "morph") {
        const p = frame / MORPH;
        let out = "";
        for (let i = 0; i < target.length; i++) {
          out += (Math.random() < p * p * 1.1) ? target[i] : randChar();
        }
        el.textContent = out;
        if (frame >= MORPH) {
          el.textContent = target;
          el.classList.add("resolved");
          phase = "hold";
          frame = 0;
        }
      } else if (phase === "hold") {
        if (frame >= HOLD) {
          el.classList.remove("resolved");
          phase = "dissolve";
          frame = 0;
        }
      } else if (phase === "dissolve") {
        const p = frame / DISSOLVE;
        let out = "";
        for (let i = 0; i < target.length; i++) {
          out += (Math.random() < p) ? randChar() : target[i];
        }
        el.textContent = out;
        if (frame >= DISSOLVE) {
          msgIndex = (msgIndex + 1) % MESSAGES.length;
          target = MESSAGES[msgIndex];
          phase = "scramble";
          frame = 0;
        }
      }
      requestAnimationFrame(loop);
    }

    // Start immediately and also ensure start after short delay (covers loader)
    requestAnimationFrame(loop);
    el.textContent = scrambleStr(24);
  }

  /* ---- NYVEN particles (lightweight) ---- */
  function initNyvenParticles() {
    const host = document.getElementById("nyvenParticles");
    if (!host) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const count = reduced ? 8 : 18;
    for (let i = 0; i < count; i++) {
      const d = document.createElement("span");
      d.className = "nyven-dot";
      d.style.left = Math.random() * 100 + "%";
      d.style.top = Math.random() * 100 + "%";
      d.style.animationDelay = (Math.random() * 4) + "s";
      host.appendChild(d);
    }
  }

  /* ---- Canvas wireframe globe ---- */
  function initGlobe() {
    const canvas = document.getElementById("vexdynGlobe");
    if (!canvas) return; // superseded by Three.js globe in vexdyn-3d.js
    const ctx = canvas.getContext("2d");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.matchMedia("(max-width: 700px)").matches;

    let w = canvas.width;
    let h = canvas.height;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      const size = Math.min(560, Math.floor(canvas.parentElement.clientWidth || 560));
      canvas.style.width = size + "px";
      canvas.style.height = size + "px";
      canvas.width = size * dpr;
      canvas.height = size * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      w = size;
      h = size;
    }
    resize();
    window.addEventListener("resize", resize);

    const R = () => Math.min(w, h) * 0.42;
    const CX = () => w / 2;
    const CY = () => h / 2;

    const pointCount = isMobile ? 180 : 320;
    const points = [];
    for (let i = 0; i < pointCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);
      points.push({
        x: Math.sin(phi) * Math.cos(theta),
        y: Math.cos(phi),
        z: Math.sin(phi) * Math.sin(theta)
      });
    }

    const hubs = [
      { lat: 40, lon: -74 },
      { lat: 51, lon: 0 },
      { lat: 6, lon: 3 },
      { lat: 35, lon: 139 },
      { lat: -33, lon: 18 }
    ].map(function (h) {
      const lat = (h.lat * Math.PI) / 180;
      const lon = (h.lon * Math.PI) / 180;
      return {
        x: Math.cos(lat) * Math.cos(lon),
        y: Math.sin(lat),
        z: Math.cos(lat) * Math.sin(lon)
      };
    });

    const arcs = [
      { a: 0, b: 1, t: 0 },
      { a: 1, b: 2, t: 0.33 },
      { a: 2, b: 3, t: 0.66 }
    ];

    let rotY = 0;
    let visible = true;

    const section = canvas.closest(".globe-section") || canvas.parentElement;
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver(function (entries) {
        visible = entries[0] && entries[0].isIntersecting;
      }, { threshold: 0.05 });
      io.observe(section);
    }

    const starsHost = document.getElementById("globeStars");
    if (starsHost) {
      const starCount = isMobile ? 24 : 48;
      for (let i = 0; i < starCount; i++) {
        const s = document.createElement("span");
        s.className = "globe-star";
        s.style.left = Math.random() * 100 + "%";
        s.style.top = Math.random() * 100 + "%";
        s.style.opacity = (0.15 + Math.random() * 0.4).toFixed(2);
        starsHost.appendChild(s);
      }
    }

    function project(p, rot) {
      const cos = Math.cos(rot);
      const sin = Math.sin(rot);
      const x = p.x * cos - p.z * sin;
      const z = p.x * sin + p.z * cos;
      const y = p.y;
      const scale = R();
      return {
        sx: CX() + x * scale,
        sy: CY() - y * scale,
        z: z,
        depth: (z + 1) / 2
      };
    }

    function drawMeridians(rot) {
      const lats = 8;
      const lons = 12;
      ctx.lineWidth = 0.7;
      for (let i = 0; i < lons; i++) {
        const lon = (i / lons) * Math.PI * 2;
        ctx.beginPath();
        let started = false;
        for (let j = 0; j <= 32; j++) {
          const lat = (j / 32) * Math.PI - Math.PI / 2;
          const p = project({
            x: Math.cos(lat) * Math.cos(lon),
            y: Math.sin(lat),
            z: Math.cos(lat) * Math.sin(lon)
          }, rot);
          if (p.z < -0.05) { started = false; continue; }
          if (!started) { ctx.moveTo(p.sx, p.sy); started = true; }
          else ctx.lineTo(p.sx, p.sy);
        }
        ctx.strokeStyle = "rgba(199, 203, 209, 0.18)";
        ctx.stroke();
      }
      for (let i = 1; i < lats; i++) {
        const lat = (i / lats) * Math.PI - Math.PI / 2;
        ctx.beginPath();
        let started = false;
        for (let j = 0; j <= 48; j++) {
          const lon = (j / 48) * Math.PI * 2;
          const p = project({
            x: Math.cos(lat) * Math.cos(lon),
            y: Math.sin(lat),
            z: Math.cos(lat) * Math.sin(lon)
          }, rot);
          if (p.z < -0.05) { started = false; continue; }
          if (!started) { ctx.moveTo(p.sx, p.sy); started = true; }
          else ctx.lineTo(p.sx, p.sy);
        }
        ctx.strokeStyle = "rgba(199, 203, 209, 0.14)";
        ctx.stroke();
      }
    }

    function drawArc(from, to, progress, rot) {
      const steps = 40;
      ctx.beginPath();
      let drawn = false;
      for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        if (t > progress) break;
        const midLift = Math.sin(t * Math.PI) * 0.35;
        const x = from.x + (to.x - from.x) * t;
        const y = from.y + (to.y - from.y) * t + midLift;
        const z = from.z + (to.z - from.z) * t;
        const len = Math.sqrt(x * x + y * y + z * z) || 1;
        const p = project({ x: x / len, y: y / len, z: z / len }, rot);
        if (p.z < -0.1) { drawn = false; continue; }
        if (!drawn) { ctx.moveTo(p.sx, p.sy); drawn = true; }
        else ctx.lineTo(p.sx, p.sy);
      }
      ctx.strokeStyle = "rgba(59, 130, 246, 0.55)";
      ctx.lineWidth = 1.2;
      ctx.setLineDash([4, 4]);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    function frame() {
      requestAnimationFrame(frame);
      if (!visible && !reduced) return;

      ctx.clearRect(0, 0, w, h);
      if (!reduced) rotY += 0.0035;

      const g = ctx.createRadialGradient(CX(), CY(), R() * 0.7, CX(), CY(), R() * 1.08);
      g.addColorStop(0, "rgba(59,130,246,0)");
      g.addColorStop(0.85, "rgba(59,130,246,0.04)");
      g.addColorStop(1, "rgba(34,211,238,0.08)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(CX(), CY(), R() * 1.08, 0, Math.PI * 2);
      ctx.fill();

      drawMeridians(rotY);

      for (let i = 0; i < points.length; i++) {
        const p = project(points[i], rotY);
        if (p.z < -0.15) continue;
        const alpha = 0.15 + p.depth * 0.75;
        const size = 1 + p.depth * 1.4;
        ctx.fillStyle = p.depth > 0.55
          ? "rgba(227,231,236," + alpha.toFixed(2) + ")"
          : "rgba(96,165,250," + (alpha * 0.7).toFixed(2) + ")";
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, size, 0, Math.PI * 2);
        ctx.fill();
      }

      hubs.forEach(function (hub) {
        const p = project(hub, rotY);
        if (p.z < -0.1) return;
        const pulse = reduced ? 1 : (0.7 + 0.3 * Math.sin(performance.now() / 700 + p.sx));
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, 3.5 * pulse, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(34, 211, 238, 0.9)";
        ctx.fill();
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, 8 * pulse, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(34, 211, 238, 0.25)";
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      const t = (performance.now() / 4000) % 1;
      arcs.forEach(function (arc) {
        const prog = (t + arc.t) % 1;
        drawArc(hubs[arc.a], hubs[arc.b], prog, rotY);
      });
    }

    requestAnimationFrame(frame);
  }

  document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    initNav();
    initSearch();
    initLoader();
    initReveal();
    initProcessStagger();
    initProgress();
    initPricing();
    initCodeTransform();
    initNyvenParticles();
    /* initGlobe disabled — Three.js globe in vexdyn-3d.js */
  });
})();


  /* ---- VEXDYN SYSTEM entry ---- */
  (function initSystemEntry() {
    const btn = document.getElementById("enterSystemBtn");
    const entry = document.getElementById("systemEntry");
    const iface = document.getElementById("systemInterface");
    const intro = document.getElementById("systemIntro");
    if (!btn || !entry || !iface) return;

    btn.addEventListener("click", function () {
      entry.hidden = false;
      entry.setAttribute("aria-hidden", "false");
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const delay = reduced ? 400 : 1600;
      setTimeout(function () {
        entry.hidden = true;
        entry.setAttribute("aria-hidden", "true");
        if (intro) intro.style.display = "none";
        iface.hidden = false;
        iface.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
      }, delay);
    });
  })();


  /* ---- Create/What timeline scroll progress ---- */
  (function initTimeline() {
    const root = document.getElementById("vexdynTimeline");
    const fill = document.getElementById("timelineFill");
    if (!root || !fill) return;
    const steps = Array.prototype.slice.call(root.querySelectorAll(".timeline-step"));
    if (!steps.length) return;

    function update() {
      const rect = root.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const start = vh * 0.75;
      const end = vh * 0.25;
      const progress = Math.min(1, Math.max(0, (start - rect.top) / (start - end + rect.height * 0.35)));
      fill.style.height = (progress * 100).toFixed(1) + "%";

      steps.forEach(function (step, i) {
        const r = step.getBoundingClientRect();
        const mid = r.top + r.height * 0.35;
        if (mid < vh * 0.78) step.classList.add("is-active");
        else step.classList.remove("is-active");
      });
    }

    let ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        update();
        ticking = false;
      });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
  })();
