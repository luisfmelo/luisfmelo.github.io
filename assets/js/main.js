const nav = $('nav'),
    nav_height = nav.outerHeight();

$(document).ready(function() {
    // Expand/Collapse Professional XP description
    $('.new-entry').on('click', toggleSignal);

    // Fit text
    fitText();

    // Smooth Scroll
    $('.smoothscroll').on('click', smoothScroll);

    // Solidify navBar
    $(window).on('scroll', navBarSolidify);
    navBarSolidify();

    // Change Active Section on NavBar
    $(window).on('scroll', changeActive);
    changeActive();

    // Particles.js Initializer
    particlesJS.load('particles-js', 'particles.json');

    // Form handler -> E mail message
    formHandler();
});



/********************************************************************
 * Responsive text: https://github.com/davatron5000/FitText.js
 ********************************************************************/
function fitText() {
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
}


/********************************************************************
 *  Smooth Scroll
 ********************************************************************/
function smoothScroll(e) {
    e.preventDefault();

    var target = this.hash,
        $target = $(target);

    $('html, body').stop().animate({
        'scrollTop': $target.offset().top
    }, 800, 'swing', function() {
        window.location.hash = target;
    });
}


/********************************************************************
 *  Change Active Section on NavBar
 ********************************************************************/
function changeActive(e) {
    var cur_pos = $(this).scrollTop();

    $('section').each(function() {
        var top = $(this).offset().top - nav_height,
            bottom = top + $(this).outerHeight();

        if (cur_pos >= top && cur_pos <= bottom) {
            nav.find('li').removeClass('active');

            nav.find('a[href="#' + $(this).attr('id') + '"]').parent().addClass('active');
        }
    });
}


/********************************************************************
 *  Solidify NavBar when scroll is initiated
 ********************************************************************/
function navBarSolidify() {
    var top = $(window).scrollTop();

    if (top > 10) {
        $('#nav-wrap').addClass('navbar-solid');
    } else {
        $('#nav-wrap').removeClass('navbar-solid');
    }
}

/********************************************************************
 *  Professional Experience Expand/Collapse
 ********************************************************************/
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


/********************************************************************
 *  Form handler -> E mail message
 ********************************************************************/
 function formHandler(){
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
            $(".message").slideDown('slow').delay(1500);
            $(".message").slideUp('slow');
            if ($("#contact").valid()) {
              $.ajax("https://formspree.io/luismelo7@gmail.com", {
                  type:"POST",
                  dataType:"json",
                  data:{
                    name: $('input[name="name"]').val(),
                    email: $('input[name="email"]').val(),
                    message: $('textarea[name="message"]').val()
                  },
                  success:function(data, textStatus, jqXHR) {console.log("success");},
                  error: function(jqXHR, textStatus, errorThrown) {console.log("failure");}
              });
            }
        }
    });
}
