/* Albany Theme JavaScript functions */
(function ($, Drupal) {
  /* Desktop menu behaviors */
  var menuHoverTimeout;

  $("#main-nav ul#main-nav-top").on('mouseenter', function () {
    menuHoverTimeout = window.setTimeout(function() {
      $("#main-nav ul#main-nav-top ul").slideDown(300);
    $("#main-nav").addClass("is-open");
    }, 300);
  });
  $("#main-nav ul#main-nav-top > li > a").on('focus', function () {
    menuHoverTimeout = window.setTimeout(function() {
      $("#main-nav ul#main-nav-top ul").slideDown(300);
    $("#main-nav").addClass("is-open");
    }, 300);
  });
  $("#main-nav ul#main-nav-top").on('mouseleave', function () {
    window.clearTimeout(menuHoverTimeout);
    $("#main-nav ul#main-nav-top ul").slideUp(200);
    $("#main-nav").removeClass("is-open");
  });
  /* This is fiddly, but will work for now to turn off the drop-menu when tab
     exits the menu (sans mouse) before or after the menus. */
  $("#top-nav a, #logo a, #block-albany-searchblockbutton a").on('focus', function () {
    window.clearTimeout(menuHoverTimeout);
    $("#main-nav ul#main-nav-top ul").hide();
    $("#main-nav").removeClass("is-open");
  });

  /* Menu toggle (for touchscreens) */
  $("#main-nav-toggle").click(function() {
    if($("#main-nav").hasClass("is-open")) {
      $("#main-nav ul#main-nav-top ul").slideUp(200);
      $("#main-nav").removeClass("is-open");
    } else {
      $("#main-nav ul#main-nav-top ul").slideDown(300);
      $("#main-nav").addClass("is-open");
    }
  });

  /* Scroll handling for menu resizing */
  window.onscroll = function() {
    if (document.body.scrollTop > 134 || document.documentElement.scrollTop > 134) {
      document.getElementById("navbar").classList.add("is-scrolled");
    } else {
      document.getElementById("navbar").classList.remove("is-scrolled");
    }
  };

  /* Mobile nav behaviors */
  $("#mobile-nav-holder button.mobile-nav-dropdown").click(function(event) {
    var currentMenu = $(this).closest("li").find("ul");
    if($(currentMenu).is(":visible")) {
      $(this).removeClass("is-open");
      $(currentMenu).slideUp(300);
    } else {
      $("#mobile-nav-holder ul ul").hide();
      $(currentMenu).slideDown(300);
      $(this).addClass("is-open");
    }
  });

  /* The mobile nav region is hidden on first load to avoid flashing;
     unhide it when the hamburger is clicked */
  $("#navbvar a.menu-burger").click(function(){
    $("#navbar .region-mobile-navigation").show();
  });

  /* Re-attach actions to refreshed view filters */
  Drupal.behaviors.refresh_views = {
    attach: function () {
      // Open a Resource popup
      $("a.resource-more").click(function(event) {
          event.preventDefault();
          // hide any open resource popups
          $(".resource-popup").hide();
          // open the popup next to the button
          $(this).next(".resource-popup").show();
        });

      // Close a Resource popup
      $(".resource-popup-close-btn a").click(function(event) {
        event.preventDefault();
        $(this).closest(".resource-popup").hide();
      });

      // Hide the icon when video is clicked (this is for the lazy loaded thumbnail)
      $(".resource-video").click(function() {
        $(this).find(".resource-video-button").hide();
      });
    }
  }
})(jQuery, Drupal);
