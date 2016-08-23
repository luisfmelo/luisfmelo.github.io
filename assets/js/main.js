$(document).ready(function() {

    handleTopNavAnimation();

    /********************************************************************
     *  Responsive text: https://github.com/davatron5000/FitText.js
     ********************************************************************/
    setTimeout(function() {
        $('h1.name-responsive').fitText(1, {
            minFontSize: '20px',
            maxFontSize: '100px'
        });
    }, 100);

    setTimeout(function() {
        $('h3.name-responsive').fitText(1.5, {
            minFontSize: '6px',
            maxFontSize: '20px'
        });
    }, 100);

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


    /*----------------------------------------------------*/
    /* Highlight the current section in the navigation bar
    ------------------------------------------------------*/

    var sections = $("section");
    var navigation_links = $("#nav-wrap a");

    sections.waypoint({

        handler: function(event, direction) {

            var active_section;

            active_section = $(this);
            if (direction === "up") active_section = active_section.prev();

            var active_link = $('#nav-wrap a[href="#' + active_section.attr("id") + '"]');

            navigation_links.parent().removeClass("current");
            active_link.parent().addClass("current");

        },
        offset: '35%'

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
            if ( $("#contact").valid() )
            {
                $.post("http://formspree.io/luismelo7@gmail.com", {
                        name: "ggggg",//$('input[name="name"]').val(),
                        email: "ffff",//$('input[name="email"]').val(),
                        message: "dfdfds"//$('textarea[name="message"]').val()
                    },
                    function(data, status) {
                    });
            }

        }
    });


});

/*

$('#contact').submit(function(e) {
      var name = $('input[name="name"]');
      var email = $('input[name="email"]');
      var message = $('textarea[name="message"]');

      if(name.val() == "" || email.val() == "" || message.val() == "") {
        $('.submit-fail').fadeToggle(400);
        return false;
      }
      else {
        $.ajax({
          method: 'POST',
            crossDomain: true,
          url: 'http://formspree.io/luismelo7@gmail.com',
          data: $('#contact').serialize(),
          datatype: 'json'
        });
        e.preventDefault();
        $(this).get(0).reset();
        $('.message').fadeToggle(400);
      }

/*
  $('.submit-fail, .submit-success').click(function() {
    $(this).hide();
})
});*/
