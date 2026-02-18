/* ============================================================
   SAMUEL ALMEIDA — Portfolio Scripts
   ============================================================ */

// ── Intro Animation ──────────────────────────────────────────
// The CSS handles the visual sequence.
// After ~2.8s we fade the overlay out and remove it.

(function () {
    var overlay = document.getElementById('intro-overlay');
    if (!overlay) return;

    // Delay matches intro animation total duration
    var TOTAL_DURATION = 2800; // ms

    setTimeout(function () {
        overlay.classList.add('hidden');

        // Remove from DOM after fade-out transition (0.6s)
        setTimeout(function () {
            overlay.remove();
        }, 700);
    }, TOTAL_DURATION);
})();


// ── Navbar: add shadow on scroll ─────────────────────────────
(function () {
    var navbar = document.getElementById('navbar');
    if (!navbar) return;

    window.addEventListener('scroll', function () {
        if (window.scrollY > 20) {
            navbar.style.boxShadow = '0 2px 24px rgba(0,0,0,0.5)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    }, { passive: true });
})();


// ── Scroll-reveal: fade sections in on scroll ────────────────
(function () {
    var targets = document.querySelectorAll(
        '.education-item, .manifesto-item, .project-card, .skill-category, .portfolio-download'
    );

    if (!targets.length || !('IntersectionObserver' in window)) return;

    targets.forEach(function (el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    targets.forEach(function (el) {
        observer.observe(el);
    });
})();
