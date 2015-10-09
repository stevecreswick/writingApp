var app = app || {};

app.PageView = Backbone.View.extend({
  tagName: 'div',
  className: 'container-fluid',
  template: _.template( $('#main-page-template').html() ),
  initialize: function(){

  },
  render: function(){
    this.$el.empty();
    var html = this.template();
    var $html = $( html );
    this.$el.append( $html );
  },
  empty: function(){
    this.$el.empty();
  },
  events:{
    'click li.show-friends': 'showFriends',
    'click li.add-friends': 'addFriends',
    'click li.show-followers': 'showFollowers',
    'click li.render-friends': 'renderFriendsPage',
    'click li.home-page': 'renderMain'
  },
  showFriends: function(){
    console.log('show friends clicked');

    app.friends = new app.FriendCollection();
    app.friendPainter = new app.FriendListView({
      collection: app.friends,
      el: $('#left-pane')
    });

    app.friends.fetch({wait:true});
  },
  addFriends: function(){
    app.users = new app.UserCollection();
    app.userPainter = new app.UserListView({
      collection: app.users,
      el: $('#right-pane')
    });

    app.users.fetch();
  },
  showFollowers: function(){
    app.followers = new app.FollowerCollection();
    app.followerPainter = new app.FollowerListView({
      collection: app.followers,
      el: $('#followers-list')
    });

    app.followers.fetch();
  },
  renderPosts: function(){
    app.posts = new app.PostCollection();
    app.postPainter = new app.PostListView({
      collection: app.posts,
      el: $('#right-pane')
    });

    app.posts.fetch();
  },
  renderPromptForm: function(){
    app.promptFormPainter = new app.promptFormView({
      el: $('#left-pane')
    });

    app.promptFormPainter.render();
    app.promptFormPainter.bindSlider();
  },
  renderFriendsPage: function(){
    this.$('#left-pane').empty();
    this.showFriends();
    this.showFollowers();
    this.renderReceivedChallenges();
    // this.addFriends();
  },
  renderReceivedChallenges: function(){
    var receivedChallenges = new app.ReceivedChallengeCollection();
    console.log(receivedChallenges);
    var receivedChallengesPainter = new app.ChallengeListView({
      collection: receivedChallenges,
      el: $('#right-pane')
    });

    receivedChallenges.fetch();
  },
  renderMain: function(){
    this.render();
    this.renderPromptForm();
    this.renderPosts();
  }

});
