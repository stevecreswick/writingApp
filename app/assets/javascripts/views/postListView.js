
var app = app || {};

app.PostListView = Backbone.View.extend({
  initialize: function(){
    this.listenTo(this.collection, 'add', this.render);
  },
  render: function(){
    this.$el.empty();
    var $challengesHeader = $('<h1>').addClass('right-pane-header').text('Read');
    this.$el.append($challengesHeader);
      var posts = this.collection.models;
      var view;
        for (var i = 0; i < posts.length; i++) {
          view = new app.PostView({model: posts[i]});

          //Appends the Username to each Div
          view.renderWithUserName();
          this.$el.append( view.$el );
        }
    }
});
