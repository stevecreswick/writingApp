
var app = app || {};

app.CritiqueListView = Backbone.View.extend({
  initialize: function() {
    this.listenTo(this.collection, 'add', this.render);
  },
  render: function(){
    this.$el.empty();
      var critiques = this.collection.models;
      var view;
        for (var i = 0; i < critiques.length; i++) {
          view = new app.CritiqueView({model: critiques[i]});
          view.render();
          this.$el.append( view.$el );
        }
    }
});
