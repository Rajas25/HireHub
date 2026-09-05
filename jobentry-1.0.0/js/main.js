(function ($) {
    "use strict";

    // ============================================
    // 1. SPINNER
    // ============================================
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();

    // ============================================
    // 2. WOW.JS INIT
    // ============================================
    new WOW().init();

    // ============================================
    // 3. STICKY NAVBAR
    // ============================================
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').css('top', '0px');
        } else {
            $('.sticky-top').css('top', '-100px');
        }
    });

    // ============================================
    // 4. BACK TO TOP BUTTON
    // ============================================
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
        return false;
    });

    // ============================================
    // 5. HEADER CAROUSEL
    // ============================================
    $(".header-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        items: 1,
        dots: true,
        loop: true,
        nav: true,
        navText: [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ]
    });

    // ============================================
    // 6. TESTIMONIALS CAROUSEL
    // ============================================
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        center: true,
        margin: 24,
        dots: true,
        loop: true,
        nav: false,
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 2
            },
            992: {
                items: 3
            }
        }
    });

    // ============================================
    // 7. KEYBOARD SHORTCUTS (Heuristic #7: Flexibility & Efficiency)
    // ============================================
    document.addEventListener('keydown', function (e) {

        // --- Ctrl+S : Save Form ---
        if ((e.ctrlKey || e.metaKey) && e.key === 's') {
            e.preventDefault(); // Prevents browser's "Save Page" dialog

            // Find the first submit button inside a form
            const saveBtn = document.querySelector('form button[type="submit"]');
            if (saveBtn) {
                saveBtn.click();
            }
        }

        // --- Escape : Close Modals ---
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal.show').forEach(function (modal) {
                const closeBtn = modal.querySelector('.btn-close');
                if (closeBtn) {
                    closeBtn.click();
                }
            });
        }

        // --- Ctrl+Shift+H : Open Help Modal ---
        if (e.ctrlKey && e.shiftKey && (e.key === 'H' || e.key === 'h')) {
            e.preventDefault();
            const helpBtn = document.querySelector('.help-btn');
            if (helpBtn) {
                helpBtn.click();
            }
        }

        // --- Ctrl+J : Go to Job List ---
        if (e.ctrlKey && (e.key === 'j' || e.key === 'J')) {
            e.preventDefault();
            window.location.href = 'job-list.html';
        }

        // --- Ctrl+H : Go to Homepage ---
        if (e.ctrlKey && (e.key === 'h' || e.key === 'H') && !e.shiftKey) {
            e.preventDefault();
            window.location.href = 'index.html';
        }
    });

    // ============================================
    // 8. PASSWORD STRENGTH INDICATOR (Heuristic #5: Error Prevention)
    // ============================================
    // This runs on every page, but only works if elements exist
    const passwordField = document.getElementById('password');
    if (passwordField) {
        passwordField.addEventListener('input', function () {
            const password = this.value;
            const strengthBar = document.getElementById('strengthBar');
            const strengthText = document.getElementById('strengthText');

            if (!strengthBar || !strengthText) return;

            let score = 0;
            let color = '#dee2e6';
            let label = 'Enter a strong password';

            if (password.length >= 6) {
                if (/[a-z]/.test(password)) score++;
                if (/[A-Z]/.test(password)) score++;
                if (/[0-9]/.test(password)) score++;
                if (/[^a-zA-Z0-9]/.test(password)) score++;
            }

            if (score === 0) {
                color = '#dee2e6';
                label = 'Enter a strong password';
            } else if (score <= 1) {
                color = '#dc3545';
                label = 'Weak';
            } else if (score <= 2) {
                color = '#fd7e14';
                label = 'Fair';
            } else if (score <= 3) {
                color = '#ffc107';
                label = 'Good';
            } else {
                color = '#198754';
                label = 'Strong';
            }

            strengthBar.style.width = (score / 4) * 100 + '%';
            strengthBar.style.background = color;
            strengthText.textContent = label;
            strengthText.style.color = color;
        });
    }

    // ============================================
    // 9. CHARACTER COUNTER (Heuristic #5: Error Prevention)
    // ============================================
    // This runs on every page, but only works if elements with `oninput="updateCharCount()"` exist
    // We'll attach the function to the global scope so inline oninput can call it
    window.updateCharCount = function (elementId, counterId, maxLength) {
        const textarea = document.getElementById(elementId);
        const counter = document.getElementById(counterId);
        if (!textarea || !counter) return;
        const count = textarea.value.length;
        counter.textContent = count + ' / ' + maxLength + ' characters';
        if (count > maxLength) {
            counter.style.color = '#dc3545';
        } else {
            counter.style.color = '#6c757d';
        }
    };

    // Auto-attach to any textarea with data-char-count attribute
    document.querySelectorAll('textarea[data-char-count]').forEach(function (textarea) {
        const maxLength = parseInt(textarea.getAttribute('maxlength')) || 500;
        const counterId = textarea.getAttribute('data-char-count');
        const counter = document.getElementById(counterId);
        if (counter) {
            textarea.addEventListener('input', function () {
                const count = this.value.length;
                counter.textContent = count + ' / ' + maxLength + ' characters';
                counter.style.color = count > maxLength ? '#dc3545' : '#6c757d';
            });
            // Initialize
            const count = textarea.value.length;
            counter.textContent = count + ' / ' + maxLength + ' characters';
        }
    });

    // ============================================
    // 10. TOOLTIP INITIALIZATION (Heuristic #10: Help & Documentation)
    // ============================================
    // Initialize Bootstrap tooltips if any exist
    if (typeof bootstrap !== 'undefined' && bootstrap.Tooltip) {
        var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    }

    // ============================================
    // 11. SHOW SERVER STATUS (Heuristic #1: Visibility of System Status)
    // ============================================
    // Optional: Add a small indicator to show server status
    // This only works if there's an element with id="serverStatus"
    const serverStatus = document.getElementById('serverStatus');
    if (serverStatus) {
        serverStatus.innerHTML = '<span class="text-muted">Checking server...</span>';
        fetch('http://localhost:5000/', { mode: 'no-cors' })
            .then(function () {
                serverStatus.innerHTML = '<span class="text-success">✅ Server online</span>';
            })
            .catch(function () {
                serverStatus.innerHTML = '<span class="text-danger">❌ Server offline</span>';
            });
    }

})(jQuery);