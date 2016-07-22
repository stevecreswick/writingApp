
var app = app || {};

app.PostListView = Backbone.View.extend({
  pastCollections: null,
  nextPosts: {},
  postLimit: 20,

  initialize: function(){
    this.listenTo(this.collection, 'reset', this.render);
  },

  template: _.template( $('#post-feed-template').html() ),

  events: {
    'click .view-previous': 'viewPrevious',
    'click .more-button': 'fetchMore'
  },

  render: function(){
    this.$el.empty();
    var posts = this.collection.models;

    var view;
      for ( var i = 0; i < posts.length; i++ ) {
        view = new app.PostView( { model: posts[ i ] } );
        view.render();
        this.$el.append( view.$el );
      }

      if ( posts.length >= this.postLimit ) {
        this.renderMoreButton();
      }
    },

    renderFullPost: function(e) {
      this.$el.find( '.post-preview' ).addClass( 'post-open' );
    },

    renderMoreButton: function() {
      var $newButton,
          $buttonContainer;

      this.removeMoreButton();

      $newButton = $( '<div>' ).addClass( 'more-button' );
      $buttonContainer = $( '<div>' ).addClass( 'button-container' );

      $buttonContainer.append( $newButton );
      this.$el.append( $buttonContainer );
    },

    removeMoreButton: function() {
      var $oldButton     =   this.$el.find( '.more-button' ),
          $oldContainer  =   this.$el.find( '.button-container' );

      if ( $oldButton ) {
        $oldButton.remove();
      }

      if ( $oldContainer ) {
        $oldContainer.remove();
      }
    },

    fetchMore: function() {
      var page = app.currentPage;

      this.nextPosts[ page ] = new app.PostCollection();
      this.nextPosts[ page ].page = app.currentPage;
      this.nextPosts[ page ].endPoint = app.currentEndPoint;

      var scope = this;

      this.nextPosts[ page ].
        fetch(
          {
            url: this.nextPosts[ page ].url()
          }
        ).
        done(
          function( posts ){

            scope.renderMore( app.currentPage );
            console.log(posts);
            if ( posts.length >= 20 ) {
              scope.renderMoreButton();
            } else {
              scope.removeMoreButton();
            }
          }
        );

        app.currentPage += 1;
    },

    renderMore: function( page ){
      console.log('next posts ', this.nextPosts);
      console.log('page ', page);
      if ( this.nextPosts[ page ]  ) {
        var posts = this.nextPosts[ page ].models;

        var view;
          for ( var i = 0; i < posts.length; i++ ) {
            view = new app.PostView( { model: posts[ i ] } );
            view.render();
            this.$el.append( view.$el );
          }
      }
    },

    // ------------------------------------

    paginate: function() {
      // console.log('scrolling');
      // console.log(e);
      var scroll = $( window ).scrollTop();
      console.log(scroll);
      if ( scroll >= 3500 ) {
        console.log('load more');
        console.log(scroll);
        // $( window ).scrollTop( 3500 );

        // Increase Page Number
        // this.loadMore();
      }
      // console.log($(e));
      // console.log(e.scrollTop);
    },

    loadMore: function() {
      app.currentPage += 1;
      this.collection.page = app.currentPage;

      var scope = this;
      this.collection.
        fetch(
          {
            url: this.collection.url()
          }
        ).
        done(
          function( data ){

            console.log(data);
            scope.render();
          }
        );

    },

    viewMore: function(){
      app.pagePainter.currentPage = app.pagePainter.currentPage + 1;
      this.renderMore();
      this.renderMoreButton();
    },

    viewPrevious: function(){
      if ( app.pagePainter.currentPage > 0 ) {
        app.pagePainter.currentPage = app.pagePainter.currentPage - 1;
        this.renderMore();
      } else {
      }
    },
    renderButtons: function(length){
      var $row = $('<div>').addClass("row");
      var $col1 = $('<div>').addClass("col-xs-4 text-left previous");
      var $colCenter = $('<div>').addClass("col-xs-4 text-center");
      var $col2 = $('<div>').addClass("col-xs-4 text-right");

      if (length >= 10){
        var $more = $('<a>').addClass('view-more btn btn-raised btn-fab btn-info withripple').html("<i class='fa fa-angle-right'><div class='tiny-text'>Next</div></i>").attr("href", "javascript:void(0)");
        $col2.empty();
        $col2.append( $more );
      }

      if (app.pagePainter.currentPage > 0) {
        var $previous = $('<a>').addClass('view-previous btn btn-raised btn-fab btn-danger withripple').html("<i class='fa fa-angle-left'><div class='tiny-text'>Prev</div></i>").attr("href", "javascript:void(0)");
        $col1.empty();
        $col1.append( $previous );
      }

      $colCenter.html( "Page: " + (app.pagePainter.currentPage + 1) );
      $row.append( $col1, $colCenter, $col2 );
      this.$el.append( $row );

    },

    // Update Post List
      updateList: function(e){
        var scope = this;
        this.$el.find('#post-list').remove();

        this.currentGenre = $(e.currentTarget).eq(0).data('url');
        console.log(this.currentGenre);
        this.currentPage = 0;
        // $("#center-pane").hide("fast");
        this.updateHeader( this.currentGenre );

        // setTimeout(function(){
          this.renderPosts( this.currentGenre, this.currentPage );
        // }, 100);
        // $("#center-pane").show("fast");

      }


});
