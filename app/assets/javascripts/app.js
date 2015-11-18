
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


// $stopwatch.html(hours + ':' + minutes + ':' + seconds);
//
// bindStart();
// bindStop();
// bindReset();



  // app.pagePainter.renderPromptForm();

// });


var do_on_load = function() {

  // Responsible for clearing and rendering page
  app.pagePainter = new app.PageView({
    el: $('#main-page')
  });



  app.pagePainter.render();
  app.pagePainter.renderPosts( app.pagePainter.currentGenre );
//


}
$(document).ready(do_on_load)
