var app = app || {};

app.FollowerListView = Backbone.View.extend({
  initialize: function(){
    this.listenTo(this.collection, 'add', this.render);
  },
  render: function(){
    this.$el.empty();
      var followers = this.collection.models;
      var view;
        for (var i = 0; i < followers.length; i++) {
          view = new app.FriendView({model: followers[i]});
          view.render();
          this.$el.append( view.$el );
        }
    }
});
