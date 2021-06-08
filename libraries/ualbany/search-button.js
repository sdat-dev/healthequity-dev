(function (Drupal) {

  /* ensure any open panels are closed before showing selected */
  jQuery('.albany-utilities').on('show.bs.collapse', function () {
    jQuery('.albany-utilities .in').collapse('hide');
  });

  /* jQuery('.path-search form.search-page-form').attr('method','get').attr('onsubmit','return albany_search(type.value, albany_URLEncode(keywords.value));').attr('action',''); */

  jQuery("#block-topnav .albany-search-link").click(function () {
    jQuery('.search-block-form').slideToggle(320, function () {
      jQuery('.search-button .field--name-body a').toggleClass('open');
      jQuery('.search-block-form input.headerSearchBox').focus();
    });
  });

})(Drupal);

/* caller url-encodes 'keywords' */
function albany_search(type, keywords) {
  var searchURL = '';
  switch (type) {
      /*
            case 'SITE':
              searchURL = '/search/node?keys=' + keywords;
              break;
      */
    case 'GOOGLE':
    default:

      searchURL = 'https://www.albany.edu/search/search_results.php?cx=009452333206896616693%3Aabbjmkl5yry&cof=FORID%3A11&ie=UTF-8&sa.x=0&sa.y=0&sa=Search&siteurl=www.albany.edu%2F&ref=www.google.com%2F&ss=233j24671j6&q=' + keywords;
      break;
  }
  //location.href = searchURL;
  window.open(searchURL, '_blank');
  return false;
}

function albany_URLEncode(url) {
  var safechars = "0123456789" +
      "ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
      "abcdefghijklmnopqrstuvwxyz" +
      "-_.!~*'()";
  var hex = "0123456789ABCDEF";

  var plaintext = url;
  var encoded = "";
  for (var i = 0; i < plaintext.length; i++) {
    var ch = plaintext.charAt(i);
    if (ch == " ") {
      encoded += "+";
    }
    else if (safechars.indexOf(ch) != -1) {
      encoded += ch;
    }
    else {
      var charCode = ch.charCodeAt(0);
      if (charCode > 255) {
        encoded += "+";
      }
      else {
        encoded += "%";
        encoded += hex.charAt((charCode >> 4) & 0xF);
        encoded += hex.charAt(charCode & 0xF);
      }
    }
  }
  return encoded;
};
(function ($, Drupal) {
  Drupal.behaviors.searchbutton = {
    attach: function (context, settings) {
      if (!$('.search-block-form').hasClass('search-processed')) {
        $('.search-block-form').addClass('search-processed');
        $('.search-button .field--name-body a').unbind().on('click', function (event) {
          event.preventDefault();
          if (jQuery(window).width() > 1045) {
            jQuery('.search-block-form').animate({
              width: 'toggle',
              paddingLeft: 'toggle',
              paddingRight: 'toggle'
            }, 320, function () {
              jQuery('.search-button .field--name-body a').toggleClass('open');
            });
          }
          else {
            jQuery('.search-block-form').slideToggle(320, function () {
              jQuery('.search-button .field--name-body a').toggleClass('open');
            });
          }
        });
      }

      $('body').addClass("proccessed-flex");
    }
  }

})(jQuery, Drupal);
