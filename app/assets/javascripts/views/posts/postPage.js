var app = app || {};
app.currentGenre = "main";
app.currentPage = "0";
app.PostPage = Backbone.View.extend( {
  tagName: 'div',
  className: 'post',
  template: _.template( $('#post-page-template').html() ),

  events: {
  },

  render: function() {
    this.$el.empty();
    this.$el.append( $( this.template() ) );
    this.renderPosts();
  },

  renderPosts: function(options){

    app.posts = new app.PostCollection();
    app.posts.genre = app.currentGenre;
    app.posts.page = app.currentPage;

    app.postPainter = new app.PostListView({
      collection: app.posts,
      el: $( '#post-list ')
    });

    app.posts.fetch({url: app.posts.url()}).done(function(){
      app.postPainter.render();
    });
  },

} );
