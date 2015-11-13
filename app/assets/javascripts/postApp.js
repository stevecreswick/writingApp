var app = app || {};


  app.token = $('#api-token').val();
  $.ajaxSetup({
    headers:{
      "accept": "application/json",
      "token": app.token
    }
  });



  var do_on_load = function() {

    var postNumber = $('#post_id').val();
    var urlModel = "/api/posts/" + postNumber + "/critiques";
    var postUrl = "/api/posts/" + postNumber;

    app.post = new app.Post();
    app.post.fetch({url:postUrl, wait:true});

    app.postPainter = new app.PostView({
      model: app.post,
      el: $('.post')
    });

    app.postPainter.render();
    app.postPainter.renderCritiques();

    app.critiques = new app.CritiquesCollection();
  //
  //
    app.critiqueList = new app.CritiqueListView({
      collection: app.critiques,
      el: $('.critiques-list')
    });
  //   app.critiques.fetch({url: urlModel});
  console.log('loaded bruh');

  }
  $(document).ready(do_on_load)
  $(window).bind('page:change', do_on_load)



  //
  // app.pagePainter = new app.PostView({
  //   el: $('#profile-page'),
  //   model: app.post
  // });
  //
  // app.profileUser.fetch({url: urlModel});
  // app.pagePainter.renderPosts();
