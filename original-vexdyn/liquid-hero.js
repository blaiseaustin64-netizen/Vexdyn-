/* VEXDYN Hero — exact liquid-wave Canvas animation (2D)
   Integrated into existing .hero container. No Three.js. */
(function () {
  "use strict";

  var canvas = document.getElementById("liquid-canvas");
  var hero = document.getElementById("hero") || document.querySelector(".hero");
  if (!canvas || !hero) return;

  var ctx = canvas.getContext("2d");
  var W = 0, H = 0, dpr = 1;
  var t = 0;
  var particles = [];
  var visible = true;
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var running = false;
  var rafId = 0;

  function isMobile() {
    return window.matchMedia("(max-width: 700px)").matches;
  }

  function resize() {
    var rect = hero.getBoundingClientRect();
    var cssW = Math.max(1, Math.floor(rect.width));
    var cssH = Math.max(1, Math.floor(rect.height));
    dpr = Math.min(window.devicePixelRatio || 1, isMobile() ? 1.25 : 1.75);
    W = canvas.width = Math.floor(cssW * dpr);
    H = canvas.height = Math.floor(cssH * dpr);
    canvas.style.width = cssW + "px";
    canvas.style.height = cssH + "px";
    // re-init particles to match size
    initParticles(isMobile() ? 48 : 100);
  }

  function drawWaveLayer(offsetY, amp, freq, speed, alpha) {
    ctx.beginPath();
    var baseY = H * offsetY;
    ctx.moveTo(0, baseY);
    for (var x = 0; x <= W; x += 6) {
      var y =
        baseY +
        Math.sin(x * freq + t * speed) * amp +
        Math.sin(x * freq * 2.3 + t * speed * 1.7) * amp * 0.3;
      ctx.lineTo(x, y);
    }
    ctx.lineTo(W, H);
    ctx.lineTo(0, H);
    ctx.closePath();

    var grad = ctx.createLinearGradient(0, baseY - amp * 2, 0, baseY + amp * 2);
    // VEXDYN silver / graphite — no blue
    grad.addColorStop(0, "rgba(242,242,240," + 0.02 * alpha + ")");
    grad.addColorStop(0.35, "rgba(200,202,208," + 0.32 * alpha + ")");
    grad.addColorStop(0.5, "rgba(242,242,240," + 0.5 * alpha + ")");
    grad.addColorStop(0.65, "rgba(154,157,164," + 0.28 * alpha + ")");
    grad.addColorStop(1, "rgba(242,242,240," + 0.02 * alpha + ")");
    ctx.fillStyle = grad;
    ctx.fill();
  }

  function drawStreak(offsetY, amp, freq, speed, phase, width) {
    ctx.beginPath();
    var baseY = H * offsetY;
    for (var x = 0; x <= W; x += 6) {
      var y =
        baseY +
        Math.sin(x * freq + t * speed) * amp +
        Math.sin(x * freq * 2.3 + t * speed * 1.7) * amp * 0.3;
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    var shimmer = (Math.sin(t * 0.6 + phase) + 1) / 2;
    ctx.strokeStyle = "rgba(242,242,240," + (0.12 + shimmer * 0.4) + ")";
    ctx.lineWidth = width;
    ctx.stroke();
  }

  function initParticles(n) {
    particles = [];
    for (var i = 0; i < n; i++) {
      particles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 2.5 * dpr + 0.5,
        vy: -(Math.random() * 0.45 + 0.18) * dpr,
        vx: (Math.random() - 0.5) * 0.32 * dpr,
        alpha: Math.random() * 0.5 + 0.15
      });
    }
  }

  function drawParticles() {
    particles.forEach(function (p) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.y < 0) p.y = H;
      if (p.x < 0) p.x = W;
      if (p.x > W) p.x = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      var g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 2);
      g.addColorStop(0, "rgba(242,242,240," + p.alpha + ")");
      g.addColorStop(1, "rgba(200,202,208,0)");
      ctx.fillStyle = g;
      ctx.fill();
    });
  }

  function render() {
    rafId = requestAnimationFrame(render);
    if (!visible) return;

    ctx.clearRect(0, 0, W, H);

    // Background vignette — VEXDYN graphite
    var bg = ctx.createRadialGradient(
      W / 2,
      H / 2,
      0,
      W / 2,
      H / 2,
      Math.max(W, H) / 1.1
    );
    bg.addColorStop(0, "#121316");
    bg.addColorStop(1, "#0a0a0c");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    if (reduced) {
      // Static soft waves only
      drawWaveLayer(0.78, 18 * dpr, 0.004, 0, 0.35);
      drawWaveLayer(0.7, 28 * dpr, 0.003, 0, 0.45);
      drawWaveLayer(0.62, 22 * dpr, 0.0035, 0, 0.55);
      return;
    }

    // Speeds tuned: faster than original 0.8/0.6/1.0, still controlled
    drawWaveLayer(0.78, 22 * dpr, 0.004, 1.15, 0.45);
    drawWaveLayer(0.7, 35 * dpr, 0.003, 0.95, 0.6);
    drawWaveLayer(0.62, 28 * dpr, 0.0035, 1.4, 0.75);

    drawStreak(0.62, 28 * dpr, 0.0035, 1.4, 0, 2 * dpr);
    drawStreak(0.7, 35 * dpr, 0.003, 0.95, 2, 1.5 * dpr);

    drawParticles();

    t += 0.028; // faster than original 0.02, not extreme
  }

  function start() {
    if (running) return;
    running = true;
    resize();
    render();
  }

  // Visibility
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(
      function (entries) {
        visible = entries[0] && entries[0].isIntersecting;
      },
      { threshold: 0.05 }
    ).observe(hero);
  }

  var resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resize, 100);
  });

  // Wait for layout
  if (document.readyState === "complete") {
    start();
  } else {
    window.addEventListener("load", start);
    // also try after short delay for loader
    setTimeout(start, 100);
  }
})();
