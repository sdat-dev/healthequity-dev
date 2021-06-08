(function ($, Drupal, window, document, undefined) {
  (function ($) {

    $(document).ready(function () {

      if ($('.paragraph--type--detailed-title .col-sm-3').length < 1) {
        $('.paragraph--type--detailed-title .col-sm-9').addClass('full-width');
      }

      $('.paragraph').each(function (index) {
        var anchorID = $(this).find('.field--name-field-anchor-id').text();
        $(this).attr('id', anchorID);
      });

      $(".jump-links a").click(function () {
        var target = $(this).attr('href');
        var offset = $('#navbar').outerHeight() + 100
        $('html, body').animate({
          scrollTop: $(target).offset().top - offset
        }, 500);
      });

      $('.paragraph--type--accordion .panel-title a').html(function (i, html) {
        return "<span>" + html + "</span>";
      });
    });

  }(jQuery));
})(jQuery, Drupal, this, this.document);