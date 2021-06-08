(function ($, Drupal, drupalSettings) {

  Drupal.behaviors.menu_toggle = {
    attach: function (context, settings) {
      if ($('.paragraph--type--gridder').length && !$('body').hasClass('fittext-processed')) {
        $('body').addClass('fittext-processed');
        $('.paragraph--type--gridder .grid-cols .grid-title').fitText(0.5, {maxFontSize: '85px'});
        $('.paragraph--type--gridder .grid-cols').each(function () {
          $grid_col = $(this);
          if ($grid_col.find('.grid-col-color').length) {
            $grid_col.css({'background-color': $grid_col.find('.grid-col-color').text()});
          }

          if ($grid_col.find('img').length) {
            $path = $grid_col.find('img').attr('src');

            $grid_col.css({
              'background': 'url(' + $path + ') no-repeat',
              'background-size': 'cover'
            }).addClass('gridder-overlay');
          }
        });
      }
    }
  };

})(jQuery, Drupal, drupalSettings);