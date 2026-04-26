/* ============================================================
   SAMUEL ALMEIDA — Portfolio Scripts
   ============================================================ */

// ── Intro Animation ──────────────────────────────────────────

(function () {
    var overlay = document.getElementById('intro-overlay');
    if (!overlay) return;

    var TOTAL_DURATION = 2800;

    setTimeout(function () {
        overlay.classList.add('hidden');
        setTimeout(function () {
            overlay.remove();
        }, 700);
    }, TOTAL_DURATION);
})();


// ── Navbar: shadow on scroll ──────────────────────────────────

(function () {
    var navbar = document.getElementById('navbar');
    if (!navbar) return;

    window.addEventListener('scroll', function () {
        navbar.style.boxShadow = window.scrollY > 20
            ? '0 2px 24px rgba(0,0,0,0.5)'
            : 'none';
    }, { passive: true });
})();


// ── Scroll Reveal ────────────────────────────────────────────

(function () {
    var targets = document.querySelectorAll('.scroll-reveal');
    if (!targets.length || !('IntersectionObserver' in window)) {
        // Fallback: show everything immediately
        targets.forEach(function (el) {
            el.classList.add('visible');
        });
        return;
    }

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    targets.forEach(function (el) {
        observer.observe(el);
    });
})();


// ── Click Spark ──────────────────────────────────────────────

(function () {
    var canvas = document.createElement('canvas');
    canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9999;';
    document.body.appendChild(canvas);
    var ctx = canvas.getContext('2d');

    var CFG = { color: '#dc2626', size: 12, radius: 25, count: 8, duration: 600 };
    var sparks = [];
    var running = false;

    function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
    resize();
    window.addEventListener('resize', resize);

    function easeOut(t) { return t * (2 - t); }

    function draw(ts) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        sparks = sparks.filter(function (s) {
            var p = (ts - s.t) / CFG.duration;
            if (p >= 1) return false;
            var e = easeOut(p);
            var d = e * CFG.radius;
            var l = CFG.size * (1 - e);
            ctx.strokeStyle = CFG.color;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(s.x + d * Math.cos(s.a), s.y + d * Math.sin(s.a));
            ctx.lineTo(s.x + (d + l) * Math.cos(s.a), s.y + (d + l) * Math.sin(s.a));
            ctx.stroke();
            return true;
        });
        if (sparks.length) requestAnimationFrame(draw);
        else running = false;
    }

    document.addEventListener('click', function (e) {
        var now = performance.now();
        for (var i = 0; i < CFG.count; i++) {
            sparks.push({ x: e.clientX, y: e.clientY, a: (2 * Math.PI * i) / CFG.count, t: now });
        }
        if (!running) { running = true; requestAnimationFrame(draw); }
    });
})();


// ── Projects: hover preview ───────────────────────────────────

(function () {
    var rows = document.querySelectorAll('.project-row');
    if (!rows.length) return;

    function clearPreviews() {
        document.querySelectorAll('.projects-preview-image').forEach(function (img) {
            img.classList.remove('visible');
        });
        rows.forEach(function (r) {
            r.classList.remove('project-row--active');
        });
    }

    rows.forEach(function (row) {
        var slug = row.dataset.slug;

        row.addEventListener('mouseenter', function () {
            clearPreviews();
            row.classList.add('project-row--active');
            var preview = document.querySelector('.projects-preview-image[data-slug="' + slug + '"]');
            if (preview) preview.classList.add('visible');
        });

        row.addEventListener('mouseleave', clearPreviews);
    });
})();
