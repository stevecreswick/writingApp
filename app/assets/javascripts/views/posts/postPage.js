// $el = the Center Pane
// controls rendering of post-list or post-review

var app = app || {};

// Global Variables
app.currentEndPoint = 'main';
app.currentPage = 0;

// Post Page View
app.PostPage = Backbone.View.extend( {
  tagName: 'div',
  className: 'post',
  template: _.template( $('#post-page-template').html() ),

  events: {
    'click .post-sort'        :   'updateFeed',
  },

  render: function() {
    this.$el.empty();
    this.$el.append( $( this.template() ) );
    this.renderPosts();
  },

  renderPosts: function( options ){

    app.posts = new app.PostCollection();
    app.posts.endPoint = app.currentEndPoint;
    app.posts.page = app.currentPage;

    app.postPainter = new app.PostListView( {
      collection: app.posts,
      el: $( '#post-list' )
    } );

    app.posts.
      fetch(
        {
          url: app.posts.url()
        }
      ).
      done(
        function(){
          app.postPainter.render();
        }
      );

      app.currentPage += 1;

  },

  updateFeed: function( e ) {
    app.currentEndPoint = $( e.currentTarget ).attr( 'data-endpoint' );
    app.currentPage = 0;

    this.renderPosts();
  }

} );
