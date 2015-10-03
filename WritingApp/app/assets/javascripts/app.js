console.log('...app.js loaded')

var app = app || {};


  app.token = $('#api-token').val();
  $.ajaxSetup({
    headers:{
      "accept": "application/json",
      "token": app.token
    }
  });


app.posts = new app.PostCollection();
app.postPainter = new app.PostListView({
  collection: app.posts,
  el: $('#post-list')
});

app.posts.fetch();

app.writingPrompts = new app.WritingPromptCollection();
app.promptPainter = new app.WritingPromptListView({
  collection: app.writingPrompts,
  el: $('#prompt-container')
});

$( document ).ready(function() {

  // Create Post
  $('form#create-post').on('submit', function(e){
    e.preventDefault();
    var newMessage = $(this).find("#post-body").val();
    app.posts.create({message: newMessage},{wait:true});
  });

});
