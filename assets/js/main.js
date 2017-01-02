$(document).ready(function() {
    $("#home").load("includes/home.html");
    $("#about").load("includes/about.html");
    $("#experience").load("includes/experience.html");
    $("#education").load("includes/education.html");
    $("#contactme").load("includes/contact.html");
    handleTopNavAnimation();

    /********************************************************************
     *  Responsive text: https://github.com/davatron5000/FitText.js
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

    $('.smoothscroll').on('click', function(e) {
        e.preventDefault();

        var target = this.hash,
            $target = $(target);

        $('html, body').stop().animate({
            'scrollTop': $target.offset().top
        }, 800, 'swing', function() {
            window.location.hash = target;
        });
    });

    var sections = $('section'),
        nav = $('nav'),
        nav_height = nav.outerHeight();

    $(window).on('scroll', function() {
        var cur_pos = $(this).scrollTop();

        sections.each(function() {
            var top = $(this).offset().top - nav_height,
                bottom = top + $(this).outerHeight();

            if (cur_pos >= top && cur_pos <= bottom) {
                nav.find('li').removeClass('active');

                nav.find('a[href="#' + $(this).attr('id') + '"]').parent().addClass('active');
            }
        });
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
    /* Highlight the current section in the navigation bar
    ------------------------------------------------------*/


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


function handleTopNavAnimation() {
    var top = $(window).scrollTop();

    if (top > 10) {
        $('#nav-wrap').addClass('navbar-solid');
    } else {
        $('#nav-wrap').removeClass('navbar-solid');
    }
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
