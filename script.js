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
