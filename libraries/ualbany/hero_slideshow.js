(function ($, Drupal, drupalSettings) {


  $('.flexslider').bind('before', function (e, slider) {
    if (!$('body').hasClass("processed-video-script") && $(window).width() > 767) {
      play_slideshow_video();
    }

  });


  if ($(window).width() < 767) {
    $(".field-name-field-mp4-video").remove();
  }


  // Fix colorbox
  if ($(window).width() > 1024) {
    var width = $(window).width() * 0.7;
    var height = width * 0.75;
    //$(".colorbox-load").colorbox({iframe:true, innerWidth:width,
    // innerHeight:height});
  }

  var play_slideshow_video = function () {
    if ($(window).width() < 767) {
      return;
    }

    // @TODO add some caching / memoization to this function to make it a bit
    // smarter.
    $("#hero-video").closest(".video-wrapper").removeClass("video-loaded");
    //$("#hero-video").remove();


    // var $videoPoster = $(".video-slideshow .flex-hero-slideshow-active-slide
    // img, .video-slideshow .flex-active-slide img");

    $(".video-slideshow .video-wrapper").each(function () {
      var $this = $(this);

      var mp4 = $this.data('mp4');
      var webm = $this.data('webm');

      var video = $.parseHTML("<video height='auto' id='hero-video' muted='muted' loop='loop' autoplay='autoplay' ></video>");
      if (mp4 !== undefined) {
        $(video).append("<source src='" + mp4 + "' type='video/mp4' />");
        $("body").addClass("processed-video-script");
      }

      if (webm !== undefined) {
        $(video).append("<source src='" + webm + "' type='video/webm' />");
        $("body").addClass("processed-video-script");
      }

      $(video).bind('', function (e) {
        if (mp4 !== undefined || webm !== undefined) {
          $this.addClass("video-loaded");

        }
      });
      $this.append(video);
      $("body").addClass("processed-video");
    });
  };

  $(window).on("load", function (e) {
    if (!$('body').hasClass("processed-video") && $(window).width() > 767) {
      play_slideshow_video();

    }
  });

  $(".flex-hero-slideshow-direction-nav, .flex-hero-slideshow-control-nav, .flex-direction-nav, .flex-control-nav  ").click(play_slideshow_video);


  // Paragraph Nav
  // Cache selectors
  var lastId,
      topMenu = $("#top-menu"),
      topMenuHeight = topMenu.outerHeight() + 15,
      // All list items
      menuItems = topMenu.find("a"),
      // Anchors corresponding to menu items
      scrollItems = menuItems.map(function () {
        var item = $($(this).attr("href"));
        if (item.length) {
          return item;
        }
      });

  // Bind click handler to menu items
  // so we can get a fancy scroll animation
  menuItems.click(function (e) {
    var href = $(this).attr("href"),
        offsetTop = href === "#" ? 0 : $(href).offset().top - topMenuHeight - 75;
    $('html, body').stop().animate({
      scrollTop: offsetTop
    }, 600);
    e.preventDefault();
  });

  // Bind to scroll
  $(window).scroll(function () {
    // Get container scroll position
    var fromTop = $(this).scrollTop() + topMenuHeight;

    // Get id of current scroll item
    var cur = scrollItems.map(function () {
      if ($(this).offset().top < fromTop + 150) {
        return this;
      }
    });
    // Get the id of the current element
    cur = cur[cur.length - 1];
    var id = cur && cur.length ? cur[0].id : "";

    if (lastId !== id) {
      lastId = id;
      // Set/remove active class
      menuItems
          .parent().removeClass("active")
          .end().filter("[href='#" + id + "']").parent().addClass("active");
    }
  });


})(jQuery, Drupal, drupalSettings);