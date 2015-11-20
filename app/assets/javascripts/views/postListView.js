
var app = app || {};

app.PostListView = Backbone.View.extend({
  initialize: function(){
    this.listenTo(this.collection, 'add', this.render);
  },
  render: function(){
    this.$el.empty();

      var posts = this.collection.models;
      var $container = $('<div>').addClass('post-list');

      var view;
        for (var i = 0; i < posts.length; i++) {
          view = new app.PostView({model: posts[i]});

          //Appends the Username to each Div
          view.renderWithUserName();

          // Append the View to the Post List
          $container.append( view.$el  )
          this.$el.append( $container );
        }
    }

});
