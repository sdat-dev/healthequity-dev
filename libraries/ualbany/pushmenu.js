(function ($, Drupal) {
  Drupal.behaviors.pushmenu = {
    attach: function (context, settings) {
      var $ul = $('.region-sidebar-first .sidebar-menu-block ul.menu.nav, .region-sidebar-first .block-groupmenu-block ul.menu.nav');
      if (!$ul.hasClass('third-processed')) {
        //$ul.addClass('third-processed');
        $ul.find('li.expanded').addClass('dropdown').children('a').addClass('dropdown-toggle').attr('target', '#').attr('data-target', '#').attr('data-toggle', '').attr('aria-expanded', 'false').unbind();
        $('ul.menu.nav a.is-active').parents('li.expanded.dropdown').addClass('open2');
        $('li.expanded.dropdown.open2 > a.dropdown-toggle').addClass('open');
        $('ul.menu a.dropdown-toggle').on('click', function (event) {
          event.preventDefault();
          event.stopPropagation();
          var open = false;
          if ($(this).hasClass('open')) {
            var open = true;
          }
          if (open === false) {
            $(this).addClass('open');
          }
          else {
            $(this).removeClass('open');
          }
          $('ul.dropdown-menu a.dropdown-toggle').parent().removeClass('open');
          if ($(this).hasClass('open')) {
            $(this).attr('aria-expanded', 'true').parent().addClass('open2');
          }
          else {
            $(this).attr('aria-expanded', 'false').parent().removeClass('open2');
          }
        });
      }

      if (!$ul.hasClass('third-processed')) {
        $ul.addClass('third-processed');
        $ul.find('li.expanded.dropdown ul li.expanded').addClass('dropdown').children('a').addClass('dropdown-toggle').attr('data-target', '#').attr('data-toggle', 'dropdown').attr('target', '#');
        $('ul.dropdown-menu [data-toggle=dropdown]').on('click', function (event) {
          // Avoid following the href location when clicking
          event.preventDefault();
          // Avoid having the menu to close when clicking
          event.stopPropagation();
          // If a menu is already open we close it
          $('ul.dropdown-menu [data-toggle=dropdown]').parent().removeClass('open');
          // opening the one you clicked on
          $(this).parent().addClass('open');
        });
      }


      if (!$('body').hasClass('drawer')) {
        $('body').addClass('drawer drawer--left');
        $('.region-navigation').prepend('<a href="#" class="menu-burger" title="Toggle Mobile Menu Navigation"><span class="fa fa-bars" role="img" aria-label="mobile menu icon" aria-hidden="true"></span><span class="sr-only">Toggle Mobile Menu Navigation</span></a>');
        $('.region-mobile-navigation').addClass('drawer-nav').children('.drawer-wrap').prepend('<a href="#" class="menu-close" title="Toggle Mobile Menu Navigation"><span class="fa fa-times" role="img" aria-label="close mobile menus" aria-hidden="true"></span><span class="sr-only">Toggle Mobile Menu Navigation</span></a>');
        $('.main-nav-mobile').children('ul').addClass('drawer-menu');

        $('ul.drawer-menu > li:has(ul)').addClass('custom-dropdown').children('a').addClass('drawer-menu-item').siblings('ul').addClass('drawer-dropdown-menu');
        $('ul.drawer-menu ul.drawer-dropdown-menu > li:has(ul)').addClass('custom-subdown').children('a').addClass('sub-dropdown').siblings('ul').addClass('sub-dropdown-menu');

        $('ul.drawer-menu > li:has(ul) > a').addClass('drawer-menu-item').attr({
          'data-target': "#",
          'href': "#",
          'data-toggle': "dropdown",
          'role': "button",
          'aria-expanded': "false"
        });


        $('.drawer').drawer({
          class: {
            nav: 'drawer-nav',
            toggle: 'menu-burger'
          },
          iscroll: {
            mouseWheel: true,
            preventDefault: false
          },
          showOverlay: true
        });

        $('li.custom-dropdown > a.drawer-menu-item').click(function (e) {
          e.preventDefault();
          if ($(this).parent().hasClass('opened')) {
            $(this).parent().removeClass('opened');
            $(this).siblings('ul.drawer-dropdown-menu').slideUp();
          }
          else {
            $('li.custom-dropdown.opened').removeClass('opened').children('ul.drawer-dropdown-menu').slideUp();
            $(this).siblings('ul.drawer-dropdown-menu').slideDown();
            $(this).parent().addClass('opened');
          }

        });

        $('li.custom-subdown > a.sub-dropdown').click(function (e) {
          e.preventDefault();
          if ($(this).parent().hasClass('opened')) {
            $(this).parent().removeClass('opened');
            $(this).siblings('ul.sub-dropdown-menu').slideUp();
          }
          else {
            $('li.custom-subdown.opened').removeClass('opened').children('ul.sub-dropdown-menu').slideUp();
            $(this).siblings('ul.sub-dropdown-menu').slideDown();
            $(this).parent().addClass('opened');
          }

        });

        $('a.menu-burger').click(function (e) {
          e.preventDefault();
        });
        $('a.menu-close').click(function (e) {
          e.preventDefault();
          $('.drawer').drawer('close');
        });

        $('.drawer').on('drawer.opened', function () {
          $('ul.drawer-menu > li:has(ul):eq(0)').addClass('open');
        });

        $('a.dropdown-toggle').click(function (e) {
          e.preventDefault();
          $(this).parent().toggleClass('open');
        });

        $('.region-mobile-navigation').show();
      }
    }
  };
})(jQuery, Drupal);
