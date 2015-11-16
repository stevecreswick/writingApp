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
    'click a.write-nav': 'renderPromptForm',

    'click a.read-nav': 'renderPosts',
    'click li.sort': 'updateList',

    'click li.show-friends': 'showFriends',
    'click li.add-friends': 'addFriends',
    'click li.show-followers': 'showFollowers',
    'click li.render-friends': 'renderFriendsPage',
    'click li.render-friends': 'renderFriendsPage',
    // 'click li.home-page': 'renderMain'
  },

  currentGenre: 'all',

  renderSideNav: function(){

    var $left = $('#left-pane').eq(0);
    $left.empty();

    // Add Nav Items
    var $write = $('<a>').addClass('write-nav').html('Write');
    var $line = $('<br>')
    var $read = $('<a>').addClass('read-nav').html('Read');
    $left.append($write, $line, $read);

    // Add Genre Links
    this.renderGenreLinks( $left );
  },
  renderGenreLinks: function(node){
    var $postListHeader = _.template( $('#post-list-menu').html() )
    node.append($postListHeader);
  },

  updateList: function(e){
    this.currentGenre = $(e.currentTarget).eq(0).data('url');
    this.renderPosts( this.currentGenre );
  },

  renderPosts: function(genre){

    app.posts = new app.PostCollection();
    app.postPainter = new app.PostListView({
      collection: app.posts,
      el: $('#center-pane')
    });

    console.log(genre);

    if ( genre === 'all' ){
      var urlModel = "/api/posts";
      app.posts.url = urlModel;
    } else {
      var urlModel = "/api/posts/sorted/" + genre;
      console.log(urlModel);
      app.posts.url = urlModel;
    }

    // Sort by created at
    app.posts.comparator = function(post) {
      return post.get("created_at");
    };

    app.posts.comparator = this.reverseSortBy(app.posts.comparator);
    console.log(app.posts.url);
    app.posts.fetch({url: app.posts.url});
    app.postPainter.render();
    this.renderSideNav();
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
      el: $('#left-pane')
    });

    app.users.fetch();
    this.showFollowers();
  },
  showFollowers: function(){
    app.followers = new app.FollowerCollection();
    app.followerPainter = new app.FollowerListView({
      collection: app.followers,
      el: $('#right-pane')
    });

    app.followers.fetch();
  },
  renderPromptForm: function(){
    app.promptFormPainter = new app.promptFormView({
      el: $('#center-pane')
    });
    this.$('#center-pane').empty();
    app.promptFormPainter.render();
    app.promptFormPainter.bindSlider();

    this.renderSideNav();
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
    var receivedChallengesPainter = new app.ReceivedChallengeListView({
      collection: receivedChallenges,
      el: $('#right-pane')
    });

    receivedChallenges.fetch();
  },
  renderMain: function(){
    this.render();
    this.renderPromptForm();
    this.renderPosts( this.currentGenre );
  },
  reverseSortBy: function(sortByFunction) {
  return function(left, right) {
    var l = sortByFunction(left);
    var r = sortByFunction(right);

    if (l === void 0) return -1;
    if (r === void 0) return 1;

    return l < r ? 1 : l > r ? -1 : 0;
  };
}


});
