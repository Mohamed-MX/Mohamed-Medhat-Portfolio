(function ($) {
    "use strict";
    
    // loader
    var loader = function () {
        setTimeout(function () {
            if ($('#loader').length > 0) {
                $('#loader').removeClass('show');
            }
        }, 1);
    };
    loader();
    
    
    // Initiate the wowjs
    new WOW().init();
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });
    
    
    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 0) {
            $('.navbar').addClass('nav-sticky');
        } else {
            $('.navbar').removeClass('nav-sticky');
        }
    });
    
    
    // Smooth scrolling on the navbar links
    $(".navbar-nav a").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            
            $('html, body').animate({
                scrollTop: $(this.hash).offset().top - 45
            }, 1500, 'easeInOutExpo');
            
            if ($(this).parents('.navbar-nav').length) {
                $('.navbar-nav .active').removeClass('active');
                $(this).closest('a').addClass('active');
            }
        }
    });

    // Theme toggle (persisted)
    var applyTheme = function (theme) {
        var isDark = theme === 'dark';
        $('body').toggleClass('theme-dark', isDark);

        var $icon = $('#theme-toggle i');
        if ($icon.length) {
            $icon.removeClass('fa-moon fa-sun').addClass(isDark ? 'fa-sun' : 'fa-moon');
        }
    };

    var savedTheme = null;
    try {
        savedTheme = localStorage.getItem('theme');
    } catch (e) { }

    if (savedTheme) {
        applyTheme(savedTheme);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        applyTheme('dark');
    } else {
        applyTheme('light');
    }

    $('#theme-toggle').on('click', function () {
        var nextTheme = $('body').hasClass('theme-dark') ? 'light' : 'dark';
        applyTheme(nextTheme);
        try {
            localStorage.setItem('theme', nextTheme);
        } catch (e) { }
    });
    
    
    // Typed Initiate
    if ($('.hero .hero-text h2').length == 1) {
        var typed_strings = $('.hero .hero-text .typed-text').text();
        var typed = new Typed('.hero .hero-text h2', {
            strings: typed_strings.split(', '),
            typeSpeed: 100,
            backSpeed: 20,
            smartBackspace: false,
            loop: true
        });
    }
    
    
    // Skills
    $('.skills').waypoint(function () {
        $('.progress .progress-bar').each(function () {
            $(this).css("width", $(this).attr("aria-valuenow") + '%');
        });
    }, {offset: '80%'});


    // Testimonials carousel
    $(".testimonials-carousel").owlCarousel({
        center: true,
        autoplay: true,
        dots: true,
        loop: true,
        responsive: {
            0:{
                items:1
            }
        }
    });
    
    
    
    // Portfolio filter
    var portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
    });

    $('#portfolio-filter li').on('click', function () {
        $("#portfolio-filter li").removeClass('filter-active');
        $(this).addClass('filter-active');
        portfolioIsotope.isotope({filter: $(this).data('filter')});
    });

    // Contact form: open email client with prefilled message
    $('#contactForm').on('submit', function (event) {
        event.preventDefault();

        var name = ($('input[name="name"]').val() || '').toString().trim();
        var email = ($('input[name="email"]').val() || '').toString().trim();
        var subject = ($('input[name="subject"]').val() || '').toString().trim();
        var message = ($('textarea[name="message"]').val() || '').toString().trim();

        var mailSubject = subject || ('Portfolio inquiry' + (name ? ' — ' + name : ''));
        var bodyLines = [];
        if (name) bodyLines.push('Name: ' + name);
        if (email) bodyLines.push('Email: ' + email);
        bodyLines.push('');
        bodyLines.push(message);

        var mailto = 'mailto:heiarayashiki@gmail.com'
            + '?subject=' + encodeURIComponent(mailSubject)
            + '&body=' + encodeURIComponent(bodyLines.join('\n'));

        window.location.href = mailto;
    });
    
})(jQuery);

