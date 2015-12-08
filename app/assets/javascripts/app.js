
var app = app || {};


  app.token = $('#api-token').val();
  $.ajaxSetup({
    headers:{
      "accept": "application/json",
      "token": app.token
    }
  });





// $( document ).ready(function() {

  // Create Post


  // app.pagePainter.renderPromptForm();

// });


var do_on_load = function() {

  // Responsible for clearing and rendering page
  app.pagePainter = new app.PageView({
    el: $('#main-page')
  });



  app.pagePainter.render();
  app.pagePainter.renderPosts( app.pagePainter.currentGenre, app.pagePainter.currentPage );
  app.pagePainter.renderNavBar();

//


}
$(document).ready(do_on_load)
