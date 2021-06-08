(function ($) {
$(document).ready(function(){

  // The speed of the scroll in milliseconds
    const speed = 1000;
    var scrollbackDist = 80;
    if($("body").hasClass('user-logged-in')) {
      scrollbackDist = 153;
    }

    $('a.scrollback, body.page-node-type-academic-program .nav-area .pagenav a')
      .filter((i, a) => a.getAttribute('href').startsWith('#') || a.href.startsWith(`${location.href}#`))
      .unbind('click.smoothScroll')
      .bind('click.smoothScroll', event => {
        const targetId = event.currentTarget.getAttribute('href').split('#')[1];
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          event.preventDefault();
          $('html, body').animate({ scrollTop: $(targetElement).offset().top - scrollbackDist }, speed);
          if(history.pushState) {
            history.pushState(null, null, '#' + targetId);
          }
          else {
            // older browsers, e.g. IE11
            location.hash = '#' + targetId;
          }
        }
      });

});
}(jQuery));