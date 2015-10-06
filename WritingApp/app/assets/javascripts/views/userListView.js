var app = app || {};

app.UserListView = Backbone.View.extend({
  initialize: function(){
    this.listenTo(this.collection, 'add', this.render);
  },
  render: function(){
    this.$el.empty();
      var users = this.collection.models;
      var view;
        for (var i = 0; i < users.length; i++) {
          view = new app.UserView({model: users[i]});
          view.render();
          this.$el.append( view.$el );
        }
    }
});
