
var app = app || {};


  app.token = $('#api-token').val();
  $.ajaxSetup({
    headers:{
      "accept": "application/json",
      "token": app.token
    }
  });


// Create Form


// Can create a button that goes to Friends World

// Create Friends
app.friends = new app.FriendCollection();
app.friendPainter = new app.FriendListView({
  collection: app.friends,
  el: $('#left-pane')
});

// Create Pending Friends
app.pendingFriends = new app.PendingFriendCollection();
app.pendingFriendPainter = new app.FriendListView({
  collection: app.pendingFriends,
  el: $('#left-pane')
});


// Responsible for clearing and rendering page
app.pagePainter = new app.PageView({
  el: $('#main-page')
});

$( document ).ready(function() {

  // Create Post


// $stopwatch.html(hours + ':' + minutes + ':' + seconds);
//
// bindStart();
// bindStop();
// bindReset();
  app.pagePainter.render();
  app.pagePainter.renderPosts();
  app.pagePainter.renderPromptForm();

});
