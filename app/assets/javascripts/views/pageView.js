var app = app || {};

app.PageView = Backbone.View.extend({
  tagName: 'div',
  className: 'main-display',
  template: _.template( $('#main-page-template').html() ),
  elevenCenter: "col-xs-12 col-sm-11 col-md-11 col-lg-11",
  oneLeft: "col-sm-1 col-md-1 col-lg-1 hidden-xs",
  sevenCenter: "col-xs-7 col-sm-8 col-md-7 col-lg-7",
  fiveLeft: "col-xs-5 col-sm-4 col-md-5 col-lg-5",
  centerWidth: 11,

  currentGenre: 'all',
  currentPage: 0,

  initialize: function(){

  },

  // Page Rendering
  render: function(){
    this.$el.empty();
    var html = this.template();
    var $html = $( html );
    this.$el.append( $html );

    this.renderSideNav();
  },

  renderMain: function(){
    this.currentPage = 0;
    this.render();
    this.renderPosts( this.currentGenre, this.currentPage );
  },

  friendsPage: function(){
    this.$el.find('#center-pane .sidebar-nav').remove();
    this.$el.find('#post-list').remove();

    this.friendsNav();
    this.showFollowing();
  },

  challengesPage: function(){
    this.$el.find('#post-list').remove();
    var $div = $('<div>').attr('id', "received-challenge-holder");
    this.$el.find('#center-pane').append( $div );

    this.renderReceivedChallenges();
    this.renderReceivedChallenges();

  },

  // receivedChallenges: function(){
  //   var challenges = app.ReceivedChallengeCollection();
  //   var challengePainter = app.ReceivedChallengeListView({
  //     el: '#challenge-list'
  //   });
  //
  //   challenges.fetch();
  //   console.log(challenges);
  //
  //
  // },
  renderSideNav: function(){
    var $top = $('#top-pane').eq(0);
    var $sideNav = $(".sidebar-nav");

    $sideNav.remove();
    $top.empty();

    var $nav = $('<div>').addClass('sidebar-nav');
    $top.append($nav);

    this.renderGenreLinks( $nav );

  },

  // Render Genres
    renderGenreLinks: function(){
      var $postListHeader = _.template( $('#post-list-menu').html() )
      this.$el.find('#top-pane').append($postListHeader);
    },

// Page View Utilities
  empty: function(){
    this.$el.empty();
  },

  updateHeader: function(genre){

    switch (genre) {

      case "Romance":
        this.$el.find('.home-page').css({'font-family': "'Lovers Quarrel', cursive", "font-size": "2.5em"});
      break;

      case "Horror":
        this.$el.find('.home-page').css({'font-family': "'Loved by the King', cursive", "font-size": "2.5em"});
        this.$el.find('.post#title-holder').css({'font-family': "'Loved by the King', cursive", "font-size": "2.5em"});
      break;

      case "Science-Fiction":
        this.$el.find('.home-page').css({'font-family': "'Krona One', sans-serif", "font-size": "2.5em", "color": "red"});
      break;

      case "Historical-Fiction":
        this.$el.find('.home-page').css({'font-family': "'Homemade Apple', cursive", "font-size": "3em"});
      break;

          // font-family: ;
      default:
      this.$el.find('.home-page').css({'font-family': "'Cutive Mono', sans-serif"});
    }

  },

  toggleColumns: function() {
    if ( this.centerWidth === 11 ){
      var $left = this.$el.find('#left-columns');
      var $center = this.$el.find('#center-columns');

      $left.removeClass( this.oneLeft );
      $center.removeClass( this.elevenCenter );

      $left.addClass( this.fiveLeft );
      $center.addClass( this.sevenCenter );


    } else if ( this.centerWidth === 7 ){
      var $left = this.$el.find('#left-columns');
      var $center = this.$el.find('#center-columns');

      $left.removeClass( this.fiveLeft );
      $center.removeClass( this.sevenCenter );

      $left.addClass( this.oneLeft );
      $center.addClass( this.elevenCenter );

    }
  },

  // Event Handling

  events:{
    'click div.write-nav': 'renderPromptForm',
    'click div.cancel-post': 'renderMain',


    'click a.read-nav': 'renderPosts',
    'click div.sort': 'updateList',

    'click div.show-friends': 'friendsPage',

    'click span.show-users': 'showUsers',
    'click span.show-following': 'showFollowing',
    'click span.show-followers': 'showFollowers',

    'click li.show-challenges': 'challengesPage',


    'click li.render-friends': 'renderFriendsPage',
    'click li.render-friends': 'renderFriendsPage',
    'click .home-page': 'renderMain'
  },


// Rendering Posts


// Update Post List
  updateList: function(e){
    // this.$el.find('#center-pane').children().remove();

    this.currentGenre = $(e.currentTarget).eq(0).data('url');
    this.currentPage = 0;
    this.updateHeader( this.currentGenre );
    this.renderPosts( this.currentGenre, this.currentPage );
  },

  createPostList: function(){
    var $container = $('<div>').attr('id', 'post-list');
    this.$el.find('#center-pane').append( $container );

  },

// Show Posts by 'all' or their genre
  renderPosts: function(options){
    // this.emptyCenter();

    this.createPostList();

    app.posts = new app.PostCollection();
    app.posts.genre = this.currentGenre;
    app.posts.page = this.currentPage;
    console.log("************************");
    console.log(app.posts.genre);
    console.log(app.posts.page);


    app.postPainter = new app.PostListView({
      collection: app.posts,
      el: $('#post-list')
    });




    // if ( genre === 'all' ){
    //   var urlModel = "/api/posts/paginated/" + page;
    //   app.posts.url = urlModel;
    //   console.log(urlModel);
    // } else {
    //   var urlModel = "/api/posts/sorted/" + genre;
    //   app.posts.url = urlModel;
    // }


    // Sort by created at
    app.posts.comparator = function(post) {
      return post.get("created_at");
    };

    app.posts.comparator = this.reverseSortBy(app.posts.comparator);
    console.log(app.posts.url());
    app.posts.fetch({url: app.posts.url(), async:false});



    app.postPainter.render();


  },


// Rendering Friends

  showFollowing: function(){

    this.clearFriendsPage();

    var $center = this.$el.find('#center-pane');
    var $friendPage = $("<div>").attr('id', 'friend-page')

    $center.append( $friendPage )

    app.friends = new app.FriendCollection();
    app.friendPainter = new app.FriendListView({
      collection: app.friends,
      el: $('#friend-page')
    });

    app.friends.fetch({wait:true});

  },



  friendsNav: function(){
    var $add = $('<span>').addClass("show-users").text('Add Friends');
    var $following = $('<span>').addClass("show-following").text('Following | ');
    var $followers = $('<span>').addClass("show-followers").text('Followers | ');

    var header = $('<div>').addClass('friends-nav');
    header.append($following, $followers, $add);
    this.$el.find('#center-pane').append( header );
  },

  showFollowers: function(){
    this.clearFriendsPage();

    app.followers = new app.FollowerCollection();
    app.followerPainter = new app.FollowerListView({
      collection: app.followers,
      el: $('#friend-page')
    });

    app.followers.fetch({wait:true});

  },

  showUsers: function(){
    this.clearFriendsPage();

    app.users = new app.UserCollection();
    app.userPainter = new app.UserListView({
      collection: app.users,
      el: $('#friend-page')
    });

    app.users.fetch({url: '/users/add_friends/' + this.currentPage  });
  },

  clearFriendsPage: function(){
    this.$el.find('#friend-page').children().remove();
  },

  emptyCenter: function(){
    this.$el.find('#center-pane').children().remove();
  },


  renderPromptForm: function(){
    this.$('#top-pane').children().remove();

    // this.$('#center-pane').empty();
    this.emptyCenter();
    // console.log(this.$('#center-pane'));

    app.promptFormPainter = new app.promptFormView({
      el: $('#center-pane')
    });



    // console.log(app.promptFormPainter);

    app.promptFormPainter.render();
    // app.promptFormPainter.bindSlider();
    var $back = $('<div>').html('X').addClass('cancel-post wa-button')
    this.$el.find('.prompt-back-holder').append($back)

  },

  renderReceivedChallenges: function(){

    var receivedChallenges = new app.ReceivedChallengeCollection();
    console.log(receivedChallenges);
    var receivedChallengesPainter = new app.ReceivedChallengeListView({
      collection: receivedChallenges,
      el: $('#received-challenge-holder')
    });

    receivedChallenges.fetch();
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
