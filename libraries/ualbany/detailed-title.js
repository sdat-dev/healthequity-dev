(function ($, Drupal, drupalSettings) {

  Drupal.behaviors.detailed_title = {
    attach: function (context, settings) {
      /*if (!$("h1.center-page-title").length){ 
        $('body').addClass('no-detailed-title');
      }*/
      $('.page-node-type-person .block-groupmenu-block ul.nav > .expanded.dropdown').addClass('open2');
      $('.page-node-type-article .block-groupmenu-block ul.nav > .expanded.dropdown').addClass('open2');


      if ($("#views-exposed-form-news-news-center-page select").val() != "All") {

        var selectedOption = $("#views-exposed-form-news-news-center-page select option:selected").text();

        //alert('taxonomy is ' + selectedOption);
        $(context).find('.view-display-id-news_center_page').once('detailed_title').prepend("<p class='selected-taxonomy'>Showing Results for: " + selectedOption + "</p>");
        $(context).find('.view-display-id-news_center_page').once('detailed_title').addClass('filtered-by-taxonomy');
      }


      if (window.location.href.indexOf("news-center?tid") > -1) {
        $(function () {
          //var divLoc = $('#block-exposedformnewsnews-center-page').offset();
          $('html, body').animate({scrollTop: 900}, "fast");
          //$(window).scrollTop(900);  
          //$(document).scrollTop(
          // $("#block-exposedformnewsnews-center-page").offset().top );
        });
      }
    }
  };

})(jQuery, Drupal, drupalSettings);