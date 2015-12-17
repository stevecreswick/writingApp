var app = app || {};

app.PageView = Backbone.View.extend({
  tagName: 'div',
  className: 'main-display',
  template: _.template( $('#main-page-template').html() ),
  tenCenter: "col-xs-12 col-sm-10 col-md-10 col-lg-10",
  oneLeft: "col-sm-1 col-md-1 col-lg-1 hidden-xs",
  // sevenCenter: "col-xs-7 col-sm-8 col-md-7 col-lg-7",
  // fiveLeft: "col-xs-5 col-sm-4 col-md-5 col-lg-5",
  defaultLeft: "col-md-2 col-lg-2 hidden-xs",
  defaultCenter: "col-md-10 col-lg-10",
  centerWidth: 11,

  // Fonts Themes
  fontAll: "'Cutive Mono', sans-serif",
  fontFiction:"'Cutive Mono', sans-serif",
  fontFantasy: "'Cutive Mono', sans-serif",
  fontHorror:"'Cutive Mono', sans-serif",
  fontThriller: "'Cutive Mono', sans-serif",
  fontHistorical: "'Cutive Mono', sans-serif",
  fontFiction: "'Cutive Mono', sans-serif",
  fontCrime: "'Cutive Mono', sans-serif",
  fontRomance: "'Cutive Mono', sans-serif",
  fontSciFi: "'Cutive Mono', sans-serif",
  fontPoetry: "'Cutive Mono', sans-serif",
  fontNonFiction: "'Cutive Mono', sans-serif",

  // Background Themes
  backgroundAll: "'Cutive Mono', sans-serif",
  backgroundFiction:"'Cutive Mono', sans-serif",
  backgroundFantasy: "'Cutive Mono', sans-serif",
  backgroundHorror:"'Cutive Mono', sans-serif",
  backgroundThriller: "'Cutive Mono', sans-serif",
  backgroundHistorical: "'Cutive Mono', sans-serif",
  backgroundFiction: "'Cutive Mono', sans-serif",
  backgroundCrime: "'Cutive Mono', sans-serif",
  backgroundRomance: "'Cutive Mono', sans-serif",
  backgroundSciFi: "'Cutive Mono', sans-serif",
  backgroundPoetry: "'Cutive Mono', sans-serif",
  backgroundNonFiction: "'Cutive Mono', sans-serif",

  // Header Themes
  headerAll: "'Cutive Mono', sans-serif",
  headerFiction:"'Cutive Mono', sans-serif",
  headerFantasy: "'Cutive Mono', sans-serif",
  headerHorror:"rgb(139,0,0)",
  headerThriller: "'Cutive Mono', sans-serif",
  headerHistorical: "rgb(250,235,215)",
  headerFiction: "'Cutive Mono', sans-serif",
  headerCrime: "'Cutive Mono', sans-serif",
  headerRomance: "rgb(255,228,225)",
  headerSciFi: "'Cutive Mono', sans-serif",
  headerPoetry: "rgb(240,255,240)",
  headerNonFiction: "'Cutive Mono', sans-serif",

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

  updateHeader: function(genre){

    switch (genre) {

      case "Romance":
        this.$el.find('h1.home-page').css( {'font-family': "'Lovers Quarrel', cursive", "font-size": "2.5em"});
        this.$el.find('.container-fluid').css({"background-color": this.headerRomance})
      break;

      case "Horror":
        this.$el.find('h1.home-page').css({'font-family': "'Loved by the King', cursive", "font-size": "2.5em"});
        this.$el.find('.post#title-holder').css({'font-family': "'Loved by the King', cursive", "font-size": "2.5em"});
        this.$el.find('.container-fluid').css({"background-color": this.headerHorror})

      break;

      case "Science-Fiction":
        this.$el.find('h1.home-page').css({'font-family': "'Krona One', sans-serif", "font-size": "2.5em", "color": "red"});
        this.$el.find('.container-fluid').css({'background': "darkgrey"});

      break;

      case "Historical-Fiction":
        this.$el.find('h1.home-page').css({'font-family': "'Homemade Apple', cursive", "font-size": "3em"});
        this.$el.find('.container-fluid').css({"background-color": this.headerHistorical})

      break;

      case "Poetry":
        this.$el.find('h1.home-page').css({'font-family': "'Homemade Apple', cursive", "font-size": "3em"});
        this.$el.find('.container-fluid').css({"background-color": this.headerPoetry})

      break;

          // font-family: ;
      default:
      this.$el.find('h1.home-page').css({'font-family': this.fontAll });
    }

  },

  renderMain: function(){
    this.currentPage = 0;

    this.columns("main");
    this.render();
    this.renderNavBar();


    if(this.promptFormPainter){
      this.promptFormPainter.clearTime();
    }

    this.renderPosts( this.currentGenre, this.currentPage );
  },

  writingPage: function() {
    this.currentPage = 0;
    this.$('#left-pane').children().remove();

    this.columns("prompt");

    // empty center of page
    this.emptyCenter();

    this.renderPromptForm();

    var $back = $('<div>').html('X').addClass('cancel-post wa-button')
    this.$el.find('.prompt-back-holder').append($back)

  },
  friendsPage: function(){
    this.currentPage = 0;
    this.$el.find('#center-pane').empty();

    this.columns("main");
    this.renderSideNav();

    this.friendsNav();
    this.showFollowing();
  },

  challengesPage: function(){
    this.currentPage = 0;
    this.$el.find('#center-pane').empty();

    this.columns("main");
    this.renderSideNav();

    var $nav = _.template( $("#challenge-nav-template").html() );
    this.$el.find('#center-pane').append( $nav )
    // var $challenges = _.template( $('#challenge-screen-template').html() );
    // create current user model
    // var currentUser = new app.User();
    //
    // currentUser.url = "/users/show/" + $('#current_id').val();
    // currentUser.fetch({wait:true});
    // console.log(currentUser);

    // create current user View
    // var challengeFormPainter = new app.ChallengeFormView({
    //   el: $('#challenge-page')
    // });
    //
    // challengeFormPainter.renderWithFriendsList();



    // var name = challengeFormPainter.model.get('username');
    // var $div = $('<div>').attr('id', "received-challenge-holder");
    // this.$el.find('#center-pane').append( $challenges );

    this.sendChallenge();


  },

  renderNavBar: function(){
    this.$el.find('#header').empty();

    var $navbar = _.template( $('#nav-bar-template').html() );
    this.$el.find('#header').append($navbar);
  },

  renderWritingNav: function(){
    this.$el.find('#header').empty();
    var $navbar = _.template( $('#writing-nav-template').html() );

    this.$el.find('#header').append($navbar);
  },

  // receivedChallenges: function(){
  //   var challenges = app.ReceivedChallengeCollection();
  //   var challengePainter = app.ReceivedChallengeListView({
  //     el: '#challenge-list'
  //   });
  //
  //   challenges.fetch();
  //
  //
  // },

  renderSideNav: function(){
    var $top = $('#left-pane').eq(0);
    var $sideNav = $(".sidebar-nav");

    $sideNav.remove();
    $top.empty();

    var $nav = $('<div>').addClass('sidebar-nav');
    $top.append($nav);

    this.renderGenreLinks( $nav );

  },

  // Render Main Side Nav
    renderGenreLinks: function(){
      var $postListHeader = _.template( $('#post-list-menu').html() )
      this.$el.find('#left-pane').append($postListHeader);
    },

    // Writing Side Nav

    renderWritingSidebar: function(){
      var $postListHeader = _.template( $('#writing-side-nav').html() )
      this.$el.find('#left-pane').append($postListHeader);
    },

// Page View Utilities
  empty: function(){
    this.$el.empty();
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

  promptFormPainter: null,

  // Event Handling

  events:{

    'click .write-nav': 'writingPage',
    'click div.cancel-post': 'renderMain',

    'click .received-challenges': 'receivedChallenges',
    'click .completed-challenges': 'completedChallenges',
    'click .send-challenge': 'sendChallenge',
    // 'click .sent-challenges': 'sentChallenges',


    'click a.read-nav': 'renderPosts',
    'click div.sort': 'updateList',

    'click li.show-friends': 'friendsPage',

    'click span.show-users': 'showUsers',
    'click span.show-following': 'showFollowing',
    'click span.show-followers': 'showFollowers',

    'click li.show-challenges': 'challengesPage',


    'click li.render-friends': 'renderFriendsPage',
    'click li.render-friends': 'renderFriendsPage',
    'click .home-page': 'renderMain',
    'click .show-current-user': 'showCurrentProfile',
    'click span.show-genres': 'showGenres',


  },

showGenres: function(){
  $('.genres').show();
},
// Rendering Posts


// Update Post List
  updateList: function(e){
    this.$el.find('#center-pane').empty();

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

    app.postPainter = new app.PostListView({
      collection: app.posts,
      el: $('#post-list')
    });


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

    if (app.friends.models.length === 0){
    var $none = _.template( $('#no-friends-screen').html() );
    this.$el.find('#friend-page').append( $none );
    }



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

    if (app.followers.models.length === 0){
    var $none = _.template( $('#no-friends-screen').html() );
    this.$el.find('#friend-page').append( $none );
    }

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

  showCurrentProfile: function(){
    this.$el.find('#left-pane .genre-links').remove();
    this.$el.find('#post-list').remove();
    this.$el.find('#center-pane').empty();


    var $center = this.$el.find('#center-pane');
    var $userPage = $("<div>").attr('id', 'user-page');

    $center.append( $userPage );

    // create current user model
    var currentUser = new app.User();
    // create current user View
    var currentUserPainter = new app.CurrentUserView({
      model: currentUser,
      el: $('#user-page')
    });

    currentUser.url = "/users/show/" + $('#current_id').val();
    currentUser.fetch({wait:true});
    // app.friends = new app.FriendCollection();
    // app.friendPainter = new app.FriendListView({
    //   collection: app.friends,
    //   el: $('#friend-page')
    // });
    //
    // app.friends.fetch({wait:true});

  },

  columns: function(page){

    if (page == "prompt"){

      this.$('#left-columns').removeClass(this.defaultLeft).addClass(this.oneLeft);
      this.$('#center-columns').removeClass(this.defaultCenter).addClass(this.tenCenter);
    } else if (page == "main"){
      this.$('#left-columns').removeClass(this.oneLeft).addClass(this.defaultLeft);
      this.$('#center-columns').removeClass(this.oneCenter).addClass(this.defaultCenter);
    }

  },

  renderPromptForm: function(){

    this.promptFormPainter = new app.promptFormView({
      el: $('#center-pane')
    });

    this.promptFormPainter.render();

  },

  receivedChallenges: function(){
    this.$el.find("#challenge-page").empty();

    var receivedChallenges = new app.ReceivedChallengeCollection();

    var receivedChallengesPainter = new app.ReceivedChallengeListView({
      collection: receivedChallenges,
      el: $('#challenge-page')
    });

    receivedChallenges.fetch();



    if ( receivedChallenges.models.length === 0){
      var $none = _.template( $('#no-challenges-screen').html() );
      this.$el.find('#challenge-page').append( $none );
    }


  },


  completedChallenges: function(){
    this.$el.find("#challenge-page").empty();


    var completedChallenges = new app.CompletedChallengeCollection();

    var completedChallengesPainter = new app.CompletedChallengeListView ({
      collection: completedChallenges,
      el: $('#challenge-page')
    });

    completedChallenges.fetch();

    console.log(completedChallenges);

    if ( completedChallenges.models.length === 0){

      $('#challenge-page').html('Complete some challneges.')
      // var $none = _.template( $('#no-challenges-screen').html() );
      // this.$el.find('#challenge-list').append( $none );
    }


  },

  sendChallenge: function(){
    this.$el.find("#center-pane").empty();
    // var completedChallenges = new app.CompletedChallengeCollection();

    var $nav = _.template( $("#challenge-nav-template").html() );
    this.$el.find('#center-pane').append( $nav )

    app.challengeFormPainter = new app.ChallengeFormView ({
      el: $('#challenge-page')
    });


    app.challengeFormPainter.renderWithFriendsList();

  }


});
