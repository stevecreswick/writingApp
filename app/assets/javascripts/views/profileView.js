var app = app || {};

app.ProfileView = Backbone.View.extend({
  tagName: 'div',
  className: 'container-fluid',
  initialize: function(){
    this.addButton();
  },
  render: function(){

  },
  empty: function(){
    this.$el.empty();
  },
  events:{

  },
  // showFriends: function(){
  //   console.log('show friends clicked');
  //
  //   app.friends = new app.FriendCollection();
  //   app.friendPainter = new app.FriendListView({
  //     collection: app.friends,
  //     el: $('#left-pane')
  //   });
  //
  //   app.friends.fetch({wait:true});
  // },
  // addFriends: function(){
  //   app.users = new app.UserCollection();
  //   app.userPainter = new app.UserListView({
  //     collection: app.users,
  //     el: $('#left-pane')
  //   });
  //
  //   app.users.fetch();
  //   this.showFollowers();
  // },
  // showFollowers: function(){
  //   app.followers = new app.FollowerCollection();
  //   app.followerPainter = new app.FollowerListView({
  //     collection: app.followers,
  //     el: $('#right-pane')
  //   });
  //
  //   app.followers.fetch();
  // },
  renderPosts: function(){
    var currentId = $('#profile_id').val();
    var urlModel = "/api/users/" + currentId + "/posts";

    app.posts = new app.PostCollection();
    app.postPainter = new app.PostListView({
      collection: app.posts,
      el: $('#post-list')
    });

    // app.posts.comparator = function(post) {
    //   return post.get("created_at");
    // };
    //
    // app.posts.comparator = this.reverseSortBy(app.posts.comparator);

    app.posts.fetch({url: urlModel});
  },
  // renderPromptForm: function(){
  //   app.WritingPageController = new app.WritingPage({
  //     el: $('#new-post-box')
  //   });
  //   this.$('#new-post-box').empty();
  //   app.WritingPageController.render();
  //   app.WritingPageController.bindSlider();
  // },
  // renderFriendsPage: function(){
  //   this.$('#left-pane').empty();
  //   this.showFriends();
  //   this.showFollowers();
  //   this.renderReceivedChallenges();
  //   // this.addFriends();
  // },
  // renderReceivedChallenges: function(){
  //   var receivedChallenges = new app.ReceivedChallengeCollection();
  //   console.log(receivedChallenges);
  //   var receivedChallengesPainter = new app.ReceivedChallengeListView({
  //     collection: receivedChallenges,
  //     el: $('#right-pane')
  //   });
  //
  //   receivedChallenges.fetch();
  // },
  // renderMain: function(){
  //   this.render();
  //   this.renderPromptForm();
  //   this.renderPosts();
  // },
//   reverseSortBy: function(sortByFunction) {
//   return function(left, right) {
//     var l = sortByFunction(left);
//     var r = sortByFunction(right);
//
//     if (l === void 0) return -1;
//     if (r === void 0) return 1;
//
//     return l < r ? 1 : l > r ? -1 : 0;
//   };
// },

addButton: function() {
  var currentId = $('#current_id').val();
  var profileId = $('#profile_id').val();

  var container = this.$el.find(".profile-header-button-container");

    if (currentId === profileId) {
      var $edit = $("<a>").addClass("edit-user btn btn-info").attr("href", "/users/edit").html("Edit");
      container.append($edit);
    } else {
      var $addFriend = $("<button>").addClass("add-friend btn btn-info").html("Add Friend");
      container.append($addFriend);
    }

  var $removeFriend = $("<button>").addClass("remove-friend btn btn-info").html("Remove Friend");


}


});
