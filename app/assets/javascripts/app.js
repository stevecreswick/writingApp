
var app = app || {};


  app.token = $('#api-token').val();
  $.ajaxSetup({
    headers:{
      "accept": "application/json",
      "token": app.token
    }
  });




// function scrollToTop(){
//   $(window).scroll(function(){
//     var scroll = $(window).scrollTop();
//     console.log(scroll);
//     if (scroll > 750) {
//       $('#up-arrow').show();
//       // $('#left-columns').append("YOOOOOOOOO");
//     }
//   });
//
// }


var do_on_load = function() {

  // Responsible for clearing and rendering page
  app.pagePainter = new app.PageView({
    el: $('#main-page')
  });

  $.material.init()

  app.pagePainter.render();
  app.pagePainter.renderPosts( app.pagePainter.currentGenre, app.pagePainter.currentPage );
  app.pagePainter.renderNavBar();

// scrollToTop();

}
$(document).ready(do_on_load)
