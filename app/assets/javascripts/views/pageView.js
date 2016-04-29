// Requires Posts

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

  // Main
  fontDefault:"Brand, sans-serif",
  headerDefault:"white",
  backgroundDefault:"/assets/binding_dark.png",
  centerDefault: "white",
  headerTextDefault: "black",

  // Fiction
  fontFiction:"Brand, sans-serif",
  headerFiction:"white",
  backgroundFiction:"/assets/antique.jpg",
  centerFiction: "white",
  headerTextFiction: "black",

  // Sci Fi Theme
  backgroundSciFi: "/assets/stardust.png",
  headerTextSciFi: "black",
  headerSciFi: "white",
  fontSciFi: "Perfect Dark, sans-serif",
  centerSciFi: "rgba(0,0,0,0)",

  // Fantasy
  fontFantasy: "History, sans-serif",
  backgroundFantasy: "/assets/hold-fast.gif",
  headerTextFantasy: "black",
  headerFantasy: "white",
  centerFantasy: "white",

  // Horror
  fontHorror:"'Loved By the King', sans-serif",
  headerHorror:"/assets/dark_wood.png",
  backgroundHorror:"/assets/grey_paper.png",
  centerHorror: "white",
  headerTextHorror: "red",

  // Thriller
  fontThriller:"Thriller, sans-serif",
  headerThriller:"white",
  backgroundThriller:"/assets/binding_dark.png",
  centerThriller: "white",
  headerTextThriller: "black",

  // Historical
  fontHistorical: "Italian, sans-serif",
  headerHistorical:"white",
  backgroundHistorical:"/assets/seamlesspaper4.jpg",
  centerHistorical: "white",
  headerTextHistorical: "black",

  // Crime
  fontCrime:"Phorssa, sans-serif",
  headerCrime:"white",
  backgroundCrime:"/assets/brickwall.png",
  centerCrime: "white",
  headerTextCrime: "black",

  // Romance
  fontRomance: "'Lovers Quarrel', sans-serif",
  headerRomance:"white",
  backgroundRomance:"/assets/pink_rice.png",
  centerRomance: "white",
  headerTextRomance: "black",

  // Poetry
  fontPoetry:"PoetryPen, sans-serif",
  headerPoetry:"white",
  // backgroundPoetry:"/assets/watercolor9.jpg",
  centerPoetry: "white",
  headerTextPoetry: "black",

  // Humor
  fontHumor:"Comedy, sans-serif",
  headerHumor:"white",
  // backgroundHumor:"/assets/brick-wall.jpg",
  centerHumor: "white",
  headerTextHumor: "black",

  // NonFiction
  fontNonFiction:"Brand, sans-serif",
  headerNonFiction:"white",
  backgroundNonFiction:"/assets/binding_dark.png",
  centerNonFiction: "white",
  headerTextNonFiction: "black",

  brandFont: 'Brand, sans-serif',


  currentGenre: 'main',
  currentPage: 0,

  initialize: function(){
  },

  // Page Rendering
  render: function(){
    this.$el.empty();
    var html = this.template();
    var $html = $( html );

    this.$el.append( $html );
    this.setCurrentUser();


    // this.renderSideNav();
    // this.updateHeader('main');
  },

  setCurrentUser: function() {
    var scope = this;
    scope.model = new app.User();
    scope.model.id = $("#current_id").val();
    scope.model.url();
    scope.model.fetch({wait: true})
      .then(
        function(data){
          app.currentUser = data;
        }
      );
  },

  // Refactored Functions

  renderWritingPage: function() {
    this.currentPage = 0;
    this.emptyCurrentView();

    app.WritingPageController = new app.WritingPage({
      el: $( '#current-view' )
    });

    app.WritingPageController.render();

  },

  renderPostsPage: function() {
    this.currentPage = 0;
    this.$el.find("#center-pane").empty();

    app.PostPageController = new app.PostPage({
      el: $( '#center-pane' )
    });

    app.PostPageController.render();
  },

  // To Refactor

  updateHeader: function(genre){

    switch (genre) {

      case "main":
        var scope = this;
        // Background and Center
        // $("#main-page").fadeOut("slow", function () {
          // $('#main-display').css({'background': 'url(' + scope.backgroundDefault + ')'});
          // $('#center-pane').css({'background': scope.centerDefault});

          // navBar
          $('nav.navbar').css({'background': scope.headerDefault});

          // Nav Text
          $('.header-bar a').css({'color': scope.headerTextDefault});
          $('.headline').css({'font-family': scope.fontDefault});
          $('.sub-headline').css({'font-family': scope.brandFont, 'color': scope.headerTextDefault});
          scope.$el.find('.sub-headline').html("");
          scope.$el.find('.sub-headline').show();
          // $(this).fadeIn("slow");

        // });

      break;

      case "all":
        var scope = this;
        // Background and Center
        // $("#main-page").fadeOut("slow", function () {
          // $('#main-display').css({'background': 'url(' + scope.backgroundDefault + ')'});
          // $('#center-pane').css({'background': scope.centerDefault});

          // navBar
          $('nav.navbar').css({'background': scope.headerDefault});

          // Nav Text
          $('.header-bar a').css({'color': scope.headerTextDefault});
          $('.headline').css({'font-family': scope.fontDefault});
          $('.sub-headline').css({'font-family': scope.brandFont, 'color': scope.headerTextDefault});
          scope.$el.find('.sub-headline').html("");
          scope.$el.find('.sub-headline').show();
          // $(this).fadeIn("slow");

        // });

      break;

      case "Fiction":
        var scope = this;
        // Background and Center
        // $("#main-page").fadeOut("slow", function () {
          // $('#main-display').css({'background': 'url(' + scope.backgroundFiction + ')'});
          // $('#center-pane').css({'background': scope.centerFiction});

          // navBar
          $('nav.navbar').css({'background': scope.headerFiction});

          // Nav Text
          $('.header-bar a').css({'color': scope.headerTextFiction});
          $('.headline').css({'font-family': scope.fontFiction});
          $('.sub-headline').css({'font-family': scope.brandFont, 'color': scope.headerTextFiction});
          scope.$el.find('.sub-headline').html("Fiction");
          scope.$el.find('.sub-headline').show();
          // $(this).fadeIn("slow");

        // });

      break;

      case "Fantasy":
      var scope = this;
      // Background and Center
      // $("#main-page").fadeOut("slow", function () {
        // $('#main-display').css({'background-image': 'url(' + scope.backgroundFantasy + ')'});
        // $('#center-pane').css({'background': scope.centerFantasy});

        // navBar
        $('nav.navbar').css({'background': scope.headerFantasy});

        // Nav Text
        $('.header-bar a').css({'color': scope.headerTextFantasy});
        $('.headline').css({'font-family': scope.fontFantasy});
        $('.sub-headline').css({'font-family': scope.brandFont, 'color': scope.headerTextFantasy});
        scope.$el.find('.sub-headline').html("Fantasy");
        scope.$el.find('.sub-headline').show();
        // $('.start-writing').css({'font-family': scope.fontFantasy});

        // $(this).fadeIn("slow");

      // });

      break;

      case "Thriller":
      var scope = this;
      // Background and Center
      // $("#main-page").fadeOut("slow", function () {
        // $('#main-display').css({'background': 'url(' + scope.backgroundThriller + ')'});
        // $('#center-pane').css({'background': scope.centerThriller});

        // navBar
        $('nav.navbar').css({'background': scope.headerThriller});

        // Nav Text
        $('.header-bar a').css({'color': scope.headerTextThriller});
        $('.headline').css({'font-family': scope.fontThriller});
        $('.sub-headline').css({'font-family': scope.brandFont, 'color': scope.headerTextThriller});
        scope.$el.find('.sub-headline').html("Thriller");
        scope.$el.find('.sub-headline').show();
        // $('.start-writing').css({'font-family': scope.fontThriller});

        // $(this).fadeIn("slow");

      // });

      break;

      case "Romance":
      var scope = this;
      // Background and Center
      // $("#main-page").fadeOut("slow", function () {
        // $('#main-display').css({'background': 'url(' + scope.backgroundRomance + ')'});
        // $('#center-pane').css({'background': scope.centerRomance});

        // navBar
        $('nav.navbar').css({'background': scope.headerRomance});

        // Nav Text
        $('.header-bar a').css({'color': scope.headerTextRomance});
        $('.headline').css({'font-family': scope.fontRomance});
        $('.sub-headline').css({'font-family': scope.brandFont, 'color': scope.headerTextRomance});
        scope.$el.find('.sub-headline').html("Romance");
        scope.$el.find('.sub-headline').show();
        // $('.start-writing').css({'font-family': scope.fontRomance});

        // $(this).fadeIn("slow");

      // });

      break;

      case "Horror":
      var scope = this;
      // Background and Center
      // $("#main-page").fadeOut("slow", function () {
        // $('#main-display').css({'background': 'url(' + scope.backgroundHorror + ')'});
        // $('#center-pane').css({'background': scope.centerHorror});

        // navBar
        // $('nav.navbar').css({'background': 'url(' + scope.headerHorror + ')'});

        // Nav Text
        // $('.header-bar a').css({'color': scope.headerTextHorror});
        $('.headline').css({'font-family': scope.fontHorror});
        $('.sub-headline').css({'font-family': scope.brandFont, 'color': scope.headerTextHorror});
        scope.$el.find('.sub-headline').html("Horror");
        scope.$el.find('.sub-headline').show();
        // $('.start-writing').css({'font-family': scope.fontHorror});

        // $(this).fadeIn("slow");

      // });
      break;

      case "Science-Fiction":

        var scope = this;

        // Background and Center
        // $("#main-page").fadeOut("slow", function () {
          // $('#main-display').css({'background': 'url(' + scope.backgroundSciFi + ')'});
          // $('#center-pane').css({'background': scope.centerSciFi});

          // navBar
          $('nav.navbar').css({'background': scope.headerSciFi});

          // Nav Text
          $('.header-bar a').css({'color': scope.headerTextSciFi});
          $('.headline').css({'font-family': scope.fontSciFi});
          $('.sub-headline').css({'font-family': scope.brandFont});
          $('.sub-headline').css({'color': scope.headerTextSciFi});
          // $('.start-writing').css({'font-family': scope.fontSciFi});


          scope.$el.find('.sub-headline').html("Science Fiction");
          scope.$el.find('.sub-headline').show();

          // $('.start-writing').css({'font-family': scope.fontSciFi});

          // $(this).fadeIn("slow");

        // });

      break;

      case "Historical-Fiction":
        var scope = this;
        // Background and Center
        // $("#main-page").fadeOut("slow", function () {
          // $('#main-display').css({'background': 'url(' + scope.backgroundHistorical + ')'});
          // $('#center-pane').css({'background': scope.centerHistorical});

          // navBar
          // $('nav.navbar').css({'background': 'url(' + scope.backgroundHistorical + ')'});

          // Nav Text
          $('.header-bar a').css({'color': scope.headerTextHistorical});
          $('.headline').css({'font-family': scope.fontHistorical});
          $('.sub-headline').css({'font-family': scope.brandFont, 'color': scope.headerTextHistorical});
          scope.$el.find('.sub-headline').html("Historical Fiction");
          scope.$el.find('.sub-headline').show();
          // $('.start-writing').css({'font-family': scope.fontHistorical});

          // $(this).fadeIn("slow");

      // });

      break;

      case "Poetry":
        var scope = this;
        // Background and Center
        // $("#main-page").fadeOut("slow", function () {
          // $('#main-display').css({'background': 'url(' + scope.backgroundPoetry + ')'});
          // $('#center-pane').css({'background': scope.centerPoetry});

          // navBar
          $('nav.navbar').css({'background': scope.headerPoetry});

          // Nav Text
          $('.header-bar a').css({'color': scope.headerTextPoetry});
          $('.headline').css({'font-family': scope.fontPoetry});
          $('.sub-headline').css({'font-family': scope.brandFont, 'color': scope.headerTextPoetry});
          scope.$el.find('.sub-headline').html("Poetry");
          scope.$el.find('.sub-headline').show();
          // $('.start-writing').css({'font-family': scope.fontPoetry});

          // $(this).fadeIn("slow");

        // });

      break;

      case "Humor":
        var scope = this;
        // Background and Center
        // $("#main-page").fadeOut("slow", function () {
          // $('#main-display').css({'background': 'url(' + scope.backgroundHumor + ')'});
          // $('#center-pane').css({'background': scope.centerHumor});

          // navBar
          $('nav.navbar').css({'background': scope.headerHumor});

          // Nav Text
          $('.header-bar a').css({'color': scope.headerTextHumor});
          $('.headline').css({'font-family': scope.fontHumor});
          $('.sub-headline').css({'font-family': scope.brandFont, 'color': scope.headerTextHumor});
          scope.$el.find('.sub-headline').html("Humor");
          scope.$el.find('.sub-headline').show();
          // $('.start-writing').css({'font-family': scope.fontHumor});

          // $(this).fadeIn("slow");

        // });

      break;

      case "Non-Fiction":
        var scope = this;
        // Background and Center
        // $("#main-page").fadeOut("slow", function () {
          // $('#main-display').css({'background': 'url(' + scope.backgroundNonFiction + ')'});
          // $('#center-pane').css({'background': scope.centerNonFiction});

          // navBar
          $('nav.navbar').css({'background': scope.headerNonFiction});

          // Nav Text
          $('.header-bar a').css({'color': scope.headerTextNonFiction});
          $('.headline').css({'font-family': scope.fontNonFiction});
          $('.sub-headline').css({'font-family': scope.brandFont, 'color': scope.headerTextNonFiction});
          scope.$el.find('.sub-headline').html("Non Fiction");
          scope.$el.find('.sub-headline').show();
          // $('.start-writing').css({'font-family': scope.fontNonFiction});

          // $(this).fadeIn("slow");

      // });

      break;

      case "Crime":
        var scope = this;
        // Background and Center
        // $("#main-page").fadeOut("slow", function () {
          // $('#main-display').css({'background': 'url(' + scope.backgroundCrime + ')'});
          // $('#center-pane').css({'background': scope.centerCrime});

          // navBar
          $('nav.navbar').css({'background': scope.headerCrime});

          // Nav Text
          $('.header-bar a').css({'color': scope.headerTextCrime});
          $('.headline').css({'font-family': scope.fontCrime});
          $('.sub-headline').css({'font-family': scope.brandFont, 'color': scope.headerTextCrime});
          scope.$el.find('.sub-headline').html("Crime");
          scope.$el.find('.sub-headline').show();
          // $('.start-writing').css({'font-family': scope.fontCrime});

          // $(this).fadeIn("slow");

        // });

      break;
      default:
      this.$el.find('h1.home-page').css({'font-family': this.fontDefault });
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
    // this.renderPosts( this.currentGenre, this.currentPage );
  },

  promptsPage: function(){
    this.currentPage = 0;
    this.$el.find('#center-pane').empty();
    var $promptPage = _.template( $("#prompt-page-template").html() );
    this.$el.find("#center-pane").append( $promptPage );

    this.columns("main");
    this.renderSideNav();
    this.showPrompts();
  },

  addPrompt: function(){
    var newPrompt = this.$el.find("#new-prompt").val();

    app.prompts.create({
      "prompt": newPrompt,
      "prompt_type": "user-submitted",
      "approved": false,
      "total_votes": 0,
      "submitted_by": $('#current_id').val()
    });

    this.$el.find("#new-prompt").val("");

  },

  showPrompts: function(){
    console.log("showing prompts");

    app.prompts = new app.WritingPromptCollection();
    app.writingPromptPainter = new app.WritingPromptListView({
      collection: app.prompts,
      el: $("#prompts-list")
    });
    var promptUrl = '/api/writing_prompts/writeaway/page/' + app.pagePainter.currentPage;
    console.log(promptUrl);
    // ADD URL TO PROMPTS
    app.prompts.fetch({url: promptUrl}).done(function(){
      console.log(app.prompts);
      $("#prompts-list").show();
      app.writingPromptPainter.render();
    });


  },


  friendsPage: function(){
    this.currentPage = 0;
    this.$el.find('#center-pane').empty();

    this.columns("main");
    this.renderSideNav();

    this.friendsNav();
    this.showUsers();
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

  showResources: function(){
    this.currentPage = 0;
    this.$el.find('#center-pane').empty();
    this.clearResourcesPage();


    this.columns("main");
    this.renderSideNav();


    var $resourcePage = $("<div>").attr('id', 'resources-page')
    var $center = this.$el.find('#center-pane');

    $center.append( $resourcePage )

    app.resourcePainter = new app.ResourcePageView({
      el: $('#resources-page')
    });

    app.resourcePainter.render();
    app.resourcePainter.renderResources("all");

    // app.resources = new app.FriendCollection();
    // app.friendPainter = new app.FriendListView({
    //   collection: app.resources,
    //   el: $('#resources-page')
    // });
    //
    // app.friends.fetch({url: '/users/friends/' + this.currentPage  });

  },

  renderNavBar: function(){
    this.$el.find('#header').empty();

    var $navbar = _.template( $('#navbar-template').html() );
    this.$el.find('#header').append($navbar);
  },

  renderWritingNav: function(){
    this.$el.find('#header').empty();
    var $navbar = _.template( $('#writing-navbar-template').html() );

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
      var $postListHeader = _.template( $('#post-feed-menu-template').html() )
      this.$el.find('#left-pane').append($postListHeader);
    },

    // Writing Side Nav

    renderWritingSidebar: function(){
      var $postListHeader = _.template( $('#writing-side-nav').html() )
      this.$el.find('#main-display').css({"background": "white"})
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

    'click .write-nav': 'renderWritingPage',


    'click div.cancel-post': 'renderMain',
    'click li.show-resources': 'showResources',

    'click .received-challenges': 'receivedChallenges',
    'click .completed-challenges': 'completedChallenges',
    'click .send-challenge': 'sendChallenge',
    'click .awaiting-challenges': 'awaitingChallenges',

    // 'click .sent-challenges': 'sentChallenges',

    'click .see-all-prompts': 'promptsPage',
    'click a.read-nav': 'renderPosts',
    'click div.sort': 'updateList',

    'click li.show-friends': 'friendsPage',

    'click .show-users': 'showUsers',
    'click .show-following': 'showFollowing',
    'click .show-followers': 'showFollowers',
    'click .show-top-reviewers': 'showReviewers',

    'click #search-users': 'searchUsers',

    'click .add-prompt': 'addPrompt',
    'click li.show-challenges': 'challengesPage',


    'click li.render-friends': 'renderFriendsPage',
    'click li.render-friends': 'renderFriendsPage',
    'click .render-main-page': 'renderMain',
    'click .show-current-user': 'showCurrentProfile',
    'click span.show-genres': 'showGenres',


  },

showGenres: function(){
  $('.genres').show();
},


// Rendering Posts
  // createPostList: function(){
    // var $container = $('<div>').attr('id', 'post-list');
    // this.$el.find('#center-pane').append( $container );

  // },

// Rendering Friends

  showFollowing: function(){

    this.clearFriendsPage();

    var $center = this.$el.find('#center-pane');
    this.$el.find('#friend-page').remove();
    var $friendPage = $("<div>").attr('id', 'friend-page');
    var $none = _.template( $('#no-friends-screen').html() );


    $center.append( $friendPage )

    app.friends = new app.FriendCollection();
    app.friendPainter = new app.FriendListView({
      collection: app.friends,
      el: $('#friend-page')
    });

    app.friends.fetch({url: '/users/friends/' + this.currentPage  });

    if (app.friends.models.length === 0){
    this.$el.find('#friend-page').append( $none );
    }

  },



  friendsNav: function(){

    var $header = _.template( $('#friend-nav-template').html() );

    this.$el.find('#center-pane').append( $header );
  },

  searchUsers: function(){
    var search = this.$el.find("#user-search-form").val();

    this.searchTerm = search;
    console.log( search );

    if (search === ""){
      this.showUsers();
    } else {
      var urlModel = "/users/search/" + search + "/" + this.currentPage;

      app.currentSearch = new app.UserCollection();
      app.userPainter = new app.SearchedUserListView({
        collection: app.currentSearch,
        el: $('#friend-page')
      });

      app.currentSearch.fetch({url: urlModel});

    }



  },
  showFollowers: function(){
    this.clearFriendsPage();

    var $center = this.$el.find('#center-pane');
    this.$el.find('#friend-page').remove();

    var $friendPage = $("<div>").attr('id', 'friend-page');

    $center.append( $friendPage )

    app.followers = new app.FollowerCollection();
    app.followerPainter = new app.FollowerListView({
      collection: app.followers,
      el: $('#friend-page')
    });

    app.followers.fetch({url: '/users/followers/' + this.currentPage  });

    if (app.followers.models.length === 0){
    var $none = _.template( $('#no-friends-screen').html() );
    this.$el.find('#friend-page').append( $none );
    }

  },

  showUsers: function(){
    this.clearFriendsPage();

    var $center = this.$el.find('#center-pane');
    this.$el.find('#friend-page').remove();
    this.$el.find('.author-header').remove();

    var $friendPage = $("<div>").attr('id', 'friend-page');
    var header = $("<h1>").addClass('author-header').html("Top Authors");

    $center.append(header);
    $center.append( $friendPage )


    app.users = new app.UserCollection();
    app.userPainter = new app.UserListView({
      collection: app.users,
      el: $('#friend-page')
    });

    app.users.fetch({url: '/users/leaderboard/' + this.currentPage  });
  },

  showReviewers: function(){
    this.clearFriendsPage();

    var $center = this.$el.find('#center-pane');
    this.$el.find('#friend-page').remove();
    this.$el.find('.author-header').remove();

    var $friendPage = $("<div>").attr('id', 'friend-page');
    var header = $("<h1>").addClass('author-header').html("Top Reviewers");

    $center.append(header);
    $center.append( $friendPage )



    app.users = new app.UserCollection();
    app.userPainter = new app.UserListView({
      collection: app.users,
      el: $('#friend-page')
    });

    app.users.fetch({url: '/users/top_readers/' + this.currentPage  });
  },

  clearFriendsPage: function(){
    this.$el.find('#friend-page').children().remove();
  },

  clearResourcesPage: function(){
    this.$el.find('#resources-page').children().remove();
  },

  emptyCenter: function(){
    this.$el.find('#center-pane').children().remove();
  },

  emptyCurrentView: function(){
    this.$el.find('#current-view').children().remove();
  },

  showCurrentProfile: function(){
    this.$el.find('#post-list').remove();
    this.$el.find('#center-pane').empty();

    var $center = this.$el.find('#center-pane');
    var $userPage = $("<div>").attr('id', 'user-page');
    var $postList = $("<div>").attr("id", "post-list");

    $center.append( $userPage );

    this.$el.find(".user-posts-container").append($postList);

    // create current user model
    var currentUser = new app.User();
    // create current user View
    var currentUserPainter = new app.CurrentUserView({
      model: currentUser,
      el: $('#user-page')
    });

    currentUser.url = "/users/show/" + $('#current_id').val();
    currentUser.fetch({wait:true});
    this.currentGenre = "user";
    this.renderPosts();
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

  receivedChallenges: function(){
    this.$el.find("#challenge-page").empty();

    var urlModel = "/api/challenges/received/" + app.pagePainter.currentPage;

    console.log(urlModel);


    var receivedChallenges = new app.ReceivedChallengeCollection();

    var receivedChallengesPainter = new app.ReceivedChallengeListView({
      collection: receivedChallenges,
      el: $('#challenge-page')
    });

    receivedChallenges.fetch({url: urlModel});



    if ( receivedChallenges.models.length === 0){
      var $none = _.template( $('#no-challenges-screen').html() );
      this.$el.find('#challenge-page').append( $none );
    }


  },

  awaitingChallenges: function(){
    this.$el.find("#challenge-page").empty();

    var urlModel = "/api/challenges/awaiting/" + app.pagePainter.currentPage;

    console.log(urlModel);


    var awaitingChallenges = new app.CompletedChallengeCollection();

    var awaitingChallengesPainter = new app.CompletedChallengeListView ({
      collection: awaitingChallenges,
      el: $('#challenge-page')
    });

    awaitingChallenges.fetch({url: urlModel});



    if ( awaitingChallenges.models.length === 0){
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

      $('#challenge-page').html('Complete some challenges.')
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
