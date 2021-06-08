(function ($, Drupal) {
  Drupal.behaviors.map_accessibility = {
    attach: function (context, settings) {
      // remove the shadow pane (otherwise each shadow image is read out)
      $('.leaflet-shadow-pane').remove();
      // prevent screen readers from reading out each map tile
      $('.leaflet-tile-container img, .leaflet-shadow-pane img, .leaflet-marker-icon').attr('role', 'presentation').attr('alt', '');
    }
  };
})(jQuery, Drupal);
