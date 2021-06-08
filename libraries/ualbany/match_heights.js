(function ($, Drupal) {
  Drupal.behaviors.match_heights = {
    attach: function (context, settings) {
      if ($('.featured-social-posts-view').length && !$('.featured-social-posts-view').hasClass('match-heights')) {
        $('.featured-social-posts-view .row .col').matchHeight();
        $('.featured-social-posts-view').addClass('match-heights');
      }

      if ($('.featured-events-view-display').length && !$('.featured-events-view-display').hasClass('match-heights')) {
        $('.featured-events-view-display .row .col').matchHeight();
        $('.featured-events-view-display').addClass('match-heights');
      }

      if ($('.paragraph--type--partnerships').length && !$('.paragraph--type--partnerships').hasClass('match-heights')) {
        $('.paragraph--type--partnerships .row .grid-item').matchHeight();
        $('.paragraph--type--partnerships').addClass('match-heights');
      }

      if ($('.paragraph--type--sidebar-callout').length && !$('.paragraph--type--sidebar-callout').hasClass('match-heights')) {
        //$('.paragraph--type--sidebar-callout
        // .field-group-background-image').matchHeight({ byRow: false });
        // $('.paragraph--type--sidebar-callout').addClass('match-heights');
        $('.paragraph--type--sidebar-callout').each(function (index) {
          var $bg = $(this).find('.sidebar-callout-content-wrapper');
          if ($bg.parent().parent().css('background-image') == 'none') {
            $bg.parent().css({'background-color': 'transparent'});
          }
        });
      }

      if ($('.paragraph--type--gridder').length && !$('.paragraph--type--gridder').hasClass('match-heights')) {
        $('.paragraph--type--gridder .grid-cols').matchHeight({byRow: false});
        $('.paragraph--type--gridder').addClass('match-heights');
      }
    }
  };
})(jQuery, Drupal);