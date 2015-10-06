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

          console.log(friends[i]);
          view = new app.FriendView({model: friends[i]});
          console.log(view.model.status);
          //Appends the Username to each Div
          view.render();
          this.$el.append( view.$el );
        }
    }
});
