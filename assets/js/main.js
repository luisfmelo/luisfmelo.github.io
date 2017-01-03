$(document).ready(function() {
    var nav = $('nav'),
        nav_height = nav.outerHeight();

    /********************************************************************
     * Inclui as Diversas Secções
     ********************************************************************/
    $("#home").load("includes/home.html");
    $("#about").load("includes/about.html");
    $("#experience").load("includes/experience.html");
    $("#education").load("includes/education.html");
    $("#contactme").load("includes/contact.html");
    //handleTopNavAnimation();

    /********************************************************************
     * Responsive text: https://github.com/davatron5000/FitText.js
     ********************************************************************/
    setTimeout(function() {
        $('h1.name-responsive').fitText(0.7, {
            minFontSize: '30px',
            maxFontSize: '100px'
        });
    }, 10);

    setTimeout(function() {
        $('h3.name-responsive').fitText(1.5, {
            minFontSize: '5px',
            maxFontSize: '20px'
        });
    }, 10);

    setTimeout(function() {
        $('h4.name-responsive').fitText(1.7, {
            minFontSize: '1px',
            maxFontSize: '15px'
        });
    }, 10);

    /********************************************************************
     *  Smooth Scroll
     ********************************************************************/
    $("body").delegate(".smoothscroll", "click", function(e) {
        e.preventDefault();

        var target = this.hash,
            $target = $(target);

        $('html, body').stop().animate({
            'scrollTop': $target.offset().top
        }, 800, 'swing', function() {
            window.location.hash = target;
        });
    });


    /********************************************************************
     *  Smooth Scroll
     ********************************************************************/
     $("body").delegate(window, "scroll", function(e) {
        var cur_pos = $(this).scrollTop();

        $('section').each(function() {
            var top = $(this).offset().top - nav_height,
                bottom = top + $(this).outerHeight();

            if (cur_pos >= top && cur_pos <= bottom) {
                nav.find('li').removeClass('active');

                nav.find('a[href="#' + $(this).attr('id') + '"]').parent().addClass('active');
            }
        });

        // Expand/Collapse Professional XP description
        $('.new-entry').on('click', toggleSignal);
    });

    nav.find('a').on('click', function() {
        var $el = $(this),
            id = $el.attr('href');

        $('html, body').animate({
            scrollTop: $(id).offset().top - nav_height
        }, 500);

        return false;
    });

    /*----------------------------------------------------*/
    /* Particles.js
    ------------------------------------------------------*/
    particlesJS.load('particles-js', 'particles.json', function() {
        console.log('callback - particles.js config loaded');
    });

});

$(window).scroll(function() {
    handleTopNavAnimation();
});


/*----------------------------------------------------*/
/* Solidifica NavBar quando inici0o scrol
------------------------------------------------------*/
function handleTopNavAnimation() {
    var top = $(window).scrollTop();

    if (top > 10) {
        $('#nav-wrap').addClass('navbar-solid');
    } else {
        $('#nav-wrap').removeClass('navbar-solid');
    }
}

/*----------------------------------------------------*/
/* Professional Experience Expand/Collapse
------------------------------------------------------*/
function toggleSignal(e) {
    $el = $(this)
        .find(".signal")
        .find("i")
        .toggleClass('fa fa-minus fa fa-plus rotate rotate2');

    $(this).find('div')
        .eq(2).stop()
        .slideToggle("slow");
    setTimeout(function() {
        $el.toggleClass('rotate2 rotate');
    }, 300);
}


// When the browser is ready...
$(function() {
    // validate
    $("#contact").validate({
        // Set the validation rules
        rules: {
            name: "required",
            email: {
                required: true,
                email: true
            },
            message: "required",
        },
        // Specify the validation error messages
        messages: {
            name: "Please enter your name",
            email: "Please enter a valid email address",
            message: "Please enter a message",
        },
        // submit handler
        submitHandler: function(form) {
            //form.submit();
            $(".message").show();
            $(".message").fadeOut(4500);
            if ($("#contact").valid()) {
                $.post("http://formspree.io/luismelo7@gmail.com", {
                        name: $('input[name="name"]').val(),
                        email: $('input[name="email"]').val(),
                        message: $('textarea[name="message"]').val()
                    },
                    function(data, status) {});
            }

        }
    });


});
