// set initial size
$(document).ready(function() {
    SetIframeSize();
  });
  
  // resize on window resize
  $(window).on('resize', function() {
    SetIframeSize();
  });
  
  function SetIframeSize() {
    $("#external").width($(window).width() - 400);
    $("#external").height($(window).height() - 200);
  }