/* VEXDYN 3D — realistic dotted world globe (silver palette) */
(function () {
  "use strict";

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function whenTHREE(cb) {
    if (window.THREE) return cb();
    var n = 0;
    var id = setInterval(function () {
      n++;
      if (window.THREE) {
        clearInterval(id);
        cb();
      } else if (n > 100) clearInterval(id);
    }, 40);
  }

  function isMobile() {
    return window.matchMedia("(max-width: 700px)").matches;
  }

  function dpr() {
    return Math.min(window.devicePixelRatio || 1, isMobile() ? 1.25 : 1.75);
  }

  /* Point-in-polygon (lon/lat) */
  function insidePoly(lon, lat, poly) {
    var inside = false;
    for (var i = 0, j = poly.length - 1; i < poly.length; j = i++) {
      var xi = poly[i][0], yi = poly[i][1];
      var xj = poly[j][0], yj = poly[j][1];
      var intersect =
        yi > lat !== yj > lat &&
        lon < ((xj - xi) * (lat - yi)) / (yj - yi + 1e-12) + xi;
      if (intersect) inside = !inside;
    }
    return inside;
  }

  /* Simplified but recognizable continent outlines (lon, lat) */
  var CONTINENTS = [
    /* North America */
    [
      [-168, 65], [-140, 70], [-120, 72], [-90, 74], [-60, 70], [-55, 60],
      [-60, 50], [-55, 45], [-70, 42], [-80, 30], [-97, 25], [-105, 22],
      [-110, 30], [-125, 35], [-130, 50], [-140, 58], [-155, 60], [-168, 65]
    ],
    /* Greenland */
    [[-55, 83], [-20, 82], [-15, 70], [-40, 60], [-55, 70], [-55, 83]],
    /* South America */
    [
      [-80, 12], [-60, 12], [-35, 0], [-35, -20], [-40, -35], [-55, -50],
      [-70, -55], [-75, -40], [-80, -20], [-80, 0], [-80, 12]
    ],
    /* Europe */
    [
      [-10, 36], [-9, 44], [-5, 48], [0, 52], [5, 58], [15, 70], [30, 70],
      [40, 65], [40, 55], [30, 45], [20, 40], [10, 36], [0, 36], [-10, 36]
    ],
    /* Africa */
    [
      [-18, 35], [-10, 36], [10, 37], [25, 32], [32, 30], [40, 15], [50, 12],
      [42, -5], [40, -20], [32, -30], [20, -35], [12, -18], [0, -5],
      [-10, 5], [-15, 15], [-18, 28], [-18, 35]
    ],
    /* Asia (main) */
    [
      [40, 55], [45, 70], [60, 72], [90, 75], [120, 72], [140, 70],
      [160, 65], [170, 55], [145, 45], [140, 35], [130, 30], [120, 20],
      [105, 8], [100, 5], [95, 15], [80, 20], [70, 25], [60, 30],
      [50, 35], [45, 40], [40, 50], [40, 55]
    ],
    /* India */
    [[68, 25], [72, 8], [80, 8], [88, 22], [78, 28], [68, 25]],
    /* SE Asia / Indonesia strip */
    [[95, 5], [105, -5], [120, -8], [130, 0], [120, 10], [105, 8], [95, 5]],
    /* Australia */
    [
      [112, -12], [130, -12], [145, -15], [153, -28], [150, -38],
      [140, -38], [115, -35], [112, -22], [112, -12]
    ],
    /* Japan-ish */
    [[130, 45], [145, 43], [142, 32], [130, 33], [130, 45]]
  ];

  function isLand(lon, lat) {
    for (var i = 0; i < CONTINENTS.length; i++) {
      if (insidePoly(lon, lat, CONTINENTS[i])) return true;
    }
    return false;
  }

  function createWorldTexture() {
    var size = isMobile() ? 768 : 1536;
    var c = document.createElement("canvas");
    c.width = size;
    c.height = size / 2; /* equirectangular 2:1 */
    var ctx = c.getContext("2d");
    var W = c.width;
    var H = c.height;

    ctx.fillStyle = "#050506";
    ctx.fillRect(0, 0, W, H);

    /* faint lat/lon grid — reference wireframe feel */
    ctx.strokeStyle = "rgba(200,202,208,0.12)";
    ctx.lineWidth = 1;
    for (var lat = -60; lat <= 60; lat += 30) {
      var y = ((90 - lat) / 180) * H;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(W, y);
      ctx.stroke();
    }
    for (var lon = -150; lon <= 150; lon += 30) {
      var x = ((lon + 180) / 360) * W;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, H);
      ctx.stroke();
    }

    /* continent dots — dense, even, silver */
    var step = isMobile() ? 3.2 : 2.4;
    var radius = isMobile() ? 1.05 : 1.15;
    ctx.fillStyle = "#d0d2d8";
    for (var py = step * 0.5; py < H; py += step) {
      for (var px = step * 0.5; px < W; px += step) {
        var lon2 = (px / W) * 360 - 180;
        var lat2 = 90 - (py / H) * 180;
        if (!isLand(lon2, lat2)) continue;
        /* slight edge soft — dots near coast stay full */
        ctx.beginPath();
        ctx.arc(px, py, radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    /* soft coast outline glow */
    ctx.strokeStyle = "rgba(242,242,240,0.22)";
    ctx.lineWidth = 1.25;
    CONTINENTS.forEach(function (poly) {
      ctx.beginPath();
      for (var i = 0; i < poly.length; i++) {
        var lx = ((poly[i][0] + 180) / 360) * W;
        var ly = ((90 - poly[i][1]) / 180) * H;
        if (i === 0) ctx.moveTo(lx, ly);
        else ctx.lineTo(lx, ly);
      }
      ctx.closePath();
      ctx.stroke();
    });

    var tex = new THREE.CanvasTexture(c);
    if (THREE.SRGBColorSpace) tex.colorSpace = THREE.SRGBColorSpace;
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.ClampToEdgeWrapping;
    tex.needsUpdate = true;
    tex.minFilter = THREE.LinearFilter;
    tex.magFilter = THREE.LinearFilter;
    return tex;
  }

  function latLonToVec3(lat, lon, r) {
    var phi = (90 - lat) * (Math.PI / 180);
    var theta = (lon + 180) * (Math.PI / 180);
    return new THREE.Vector3(
      -r * Math.sin(phi) * Math.cos(theta),
      r * Math.cos(phi),
      r * Math.sin(phi) * Math.sin(theta)
    );
  }

  function initGlobe() {
    var canvas = document.getElementById("vexdynGlobe3d");
    var wrap = document.getElementById("globeWrap");
    if (!canvas || !wrap || !window.THREE) return;

    var THREE = window.THREE;
    var renderer, scene, camera, root, markers = [], arcs = [];
    var visible = false, started = false, t0 = 0;

    function measure() {
      var stage = document.getElementById("globeStage") || wrap.parentElement;
      var avail = Math.min(
        (stage && stage.clientWidth) || 9999,
        wrap.parentElement ? wrap.parentElement.clientWidth : 9999,
        document.documentElement.clientWidth || window.innerWidth || 9999,
        window.innerWidth || 9999
      );
      var pad = avail < 700 ? 28 : 40;
      var cap = avail < 700 ? 340 : 520;
      return Math.max(180, Math.floor(Math.min(avail - pad, cap)));
    }

    function size() {
      if (!renderer) return;
      var s = measure();
      wrap.style.width = s + "px";
      wrap.style.height = s + "px";
      renderer.setPixelRatio(dpr());
      renderer.setSize(s, s, false);
      camera.aspect = 1;
      if (s < 380) {
        camera.fov = 48;
        camera.position.set(0, 0.08, 4.5);
      } else {
        camera.fov = 40;
        camera.position.set(0, 0.12, 3.55);
      }
      camera.updateProjectionMatrix();
    }

    function makeArc(a, b, r) {
      var mid = a.clone().add(b).multiplyScalar(0.5).normalize().multiplyScalar(r * 1.28);
      var curve = new THREE.QuadraticBezierCurve3(a, mid, b);
      var pts = curve.getPoints(isMobile() ? 36 : 64);
      return new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(pts),
        new THREE.LineBasicMaterial({ color: 0xc8cad0, transparent: true, opacity: 0.45 })
      );
    }

    function build() {
      if (started) return;
      if (measure() < 80) return;
      started = true;

      renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: !isMobile(),
        powerPreference: "high-performance"
      });
      renderer.setClearColor(0x000000, 0);

      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(40, 1, 0.1, 50);

      scene.add(new THREE.AmbientLight(0xffffff, 0.55));
      var key = new THREE.DirectionalLight(0xf2f2f0, 0.7);
      key.position.set(2.2, 1.8, 3);
      scene.add(key);
      var fill = new THREE.DirectionalLight(0xc8cad0, 0.25);
      fill.position.set(-2, -1, 1);
      scene.add(fill);

      root = new THREE.Group();
      scene.add(root);

      /* dark core */
      root.add(
        new THREE.Mesh(
          new THREE.SphereGeometry(0.98, isMobile() ? 32 : 64, isMobile() ? 24 : 48),
          new THREE.MeshStandardMaterial({
            color: 0x0a0a0c,
            metalness: 0.55,
            roughness: 0.55
          })
        )
      );

      /* dotted world map */
      var mapTex = createWorldTexture();
      root.add(
        new THREE.Mesh(
          new THREE.SphereGeometry(1.0, isMobile() ? 48 : 72, isMobile() ? 32 : 48),
          new THREE.MeshBasicMaterial({
            map: mapTex,
            transparent: true,
            opacity: 0.95
          })
        )
      );

      /* outer glow shell */
      root.add(
        new THREE.Mesh(
          new THREE.SphereGeometry(1.045, 32, 24),
          new THREE.MeshBasicMaterial({
            color: 0xc8cad0,
            transparent: true,
            opacity: 0.06,
            side: THREE.BackSide
          })
        )
      );

      /* atmospheric ring */
      var ringGeo = new THREE.RingGeometry(1.12, 1.18, 64);
      var ringMat = new THREE.MeshBasicMaterial({
        color: 0xc8cad0,
        transparent: true,
        opacity: 0.12,
        side: THREE.DoubleSide
      });
      var ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 2.4;
      root.add(ring);

      var hubs = [
        { lat: 38, lon: -95 },
        { lat: 50, lon: 10 },
        { lat: 8, lon: 8 },
        { lat: 34, lon: 108 }
      ];
      var hubVecs = hubs.map(function (h) {
        return latLonToVec3(h.lat, h.lon, 1.03);
      });

      hubVecs.forEach(function (v) {
        var g = new THREE.Group();
        g.add(
          new THREE.Mesh(
            new THREE.SphereGeometry(0.024, 12, 12),
            new THREE.MeshBasicMaterial({ color: 0xf2f2f0 })
          )
        );
        g.add(
          new THREE.Mesh(
            new THREE.SphereGeometry(0.048, 12, 12),
            new THREE.MeshBasicMaterial({
              color: 0xc8cad0,
              transparent: true,
              opacity: 0.28
            })
          )
        );
        g.position.copy(v);
        root.add(g);
        markers.push(g);
      });

      [[0, 1], [1, 2], [2, 3]].forEach(function (p) {
        var line = makeArc(hubVecs[p[0]], hubVecs[p[1]], 1);
        root.add(line);
        arcs.push(line);
      });

      var starsHost = document.getElementById("globeStars");
      if (starsHost && !starsHost.childElementCount) {
        for (var i = 0; i < (isMobile() ? 18 : 40); i++) {
          var sp = document.createElement("span");
          sp.className = "globe-star";
          sp.style.left = Math.random() * 100 + "%";
          sp.style.top = Math.random() * 100 + "%";
          sp.style.opacity = (0.1 + Math.random() * 0.35).toFixed(2);
          starsHost.appendChild(sp);
        }
      }

      size();
      t0 = performance.now();
      animate();
    }

    function animate() {
      requestAnimationFrame(animate);
      if (!visible || !renderer) return;
      var t = (performance.now() - t0) / 1000;
      if (!reduced && root) {
        root.rotation.y = t * 0.1;
        markers.forEach(function (m, i) {
          m.scale.setScalar(0.9 + 0.1 * Math.sin(t * 2 + i));
        });
        arcs.forEach(function (a, i) {
          a.material.opacity = 0.28 + 0.2 * Math.sin(t * 1.2 + i);
        });
      }
      renderer.render(scene, camera);
    }

    if ("IntersectionObserver" in window) {
      new IntersectionObserver(
        function (e) {
          visible = e[0] && e[0].isIntersecting;
          if (visible && !started) build();
        },
        { rootMargin: "160px", threshold: 0.05 }
      ).observe(wrap);
    } else {
      visible = true;
      build();
    }

    var resizeTimer;
    window.addEventListener("resize", function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        if (started) size();
      }, 100);
    });
  }

  whenTHREE(function () {
    initGlobe();
  });
})();
