var app = app || {};

app.FriendListView = Backbone.View.extend({
  initialize: function(){
    this.listenTo(this.collection, 'add', this.render);
  },
  render: function(){
    this.$el.empty();

      var friends = this.collection.models;
      var view;

        for (var i = 0; i < friends.length; i++) {
          view = new app.FriendView({model: friends[i]});
          view.render();
          this.$el.append( view.$el );
          console.log(friends[i]);
        }
    }
});
