
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


app.promptFormPainter = new app.promptFormView({
  el: $('#left-pane')
});

app.friends = new app.FriendCollection();
app.pendingFriends = new app.PendingFriendCollection();

app.friendPainter = new app.FriendListView({
  collection: app.friends,
  el: $('#left-pane')
});

app.pendingFriendPainter = new app.FriendListView({
  collection: app.pendingFriends,
  el: $('#left-pane')
});

app.users = new app.UserCollection();

app.userPainter = new app.UserListView({
  collection: app.users,
  el: $('#left-pane')
});

$( document ).ready(function() {

  // Create Post
  $('form#create-post').on('submit', function(e){
    e.preventDefault();
    var newMessage = $(this).find("#post-body").val();
    app.posts.create({message: newMessage},{wait:true});
  });


$stopwatch.html(hours + ':' + minutes + ':' + seconds);

bindStart();
bindStop();
bindReset();


  app.promptFormPainter.render();
  app.promptFormPainter.bindSlider();

});
