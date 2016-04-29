var app = app || {};

  app.token = $('#api-token').val();
  $.ajaxSetup({
    headers:{
      "accept": "application/json",
      "token": app.token
    }
  });

var do_on_load = function() {

  // Responsible for clearing and rendering page
  app.pagePainter = new app.PageView({
    el: $('#main-page')
  });


  $.material.init()
  app.pagePainter.render();
  app.pagePainter.renderPostsPage();

  // app.pagePainter.renderPosts( app.pagePainter.currentGenre, app.pagePainter.currentPage );
  // app.pagePainter.renderNavBar();
  // app.pagePainter.currentUser();




}

$(document).ready(do_on_load);
