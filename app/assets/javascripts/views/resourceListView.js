
var app = app || {};

app.ResourceListView = Backbone.View.extend({
  initialize: function(){
    this.listenTo(this.collection, 'add', this.render);
  },
  render: function(){
    this.$el.empty();

      var resources = this.collection.models;
      var view;
        for (var i = 0; i < resources.length; i++) {
          console.log("rendering");
          view = new app.ResourceView({model: resources[i]});
          view.render();
          this.$el.append( view.$el );
        }
    }
});
