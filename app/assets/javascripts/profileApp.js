var app = app || {};


  app.token = $('#api-token').val();
  $.ajaxSetup({
    headers:{
      "accept": "application/json",
      "token": app.token
    }
  });





  var do_on_load = function() {

  var currentId = $('#profile_id').val();
  var urlModel = "/api/users/" + currentId + "/posts";

  app.profileUser = new app.User();

  app.pagePainter = new app.ProfileView({
    el: $('#profile-page'),
    model: app.profileUser
  });

  app.profileUser.fetch({url: urlModel});
  app.pagePainter.renderPosts();





}
$(document).ready(do_on_load)
$(window).bind('page:change', do_on_load)
