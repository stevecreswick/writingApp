
var app = app || {};

app.ResourceListView = Backbone.View.extend({
  initialize: function(){
    this.listenTo(this.collection, 'add', this.render);
  },
  render: function(){
    this.$el.empty();

      var prompts = this.collection.models;
      var view;
        for (var i = 0; i < prompts.length; i++) {
          view = new app.WritingPromptView({model: prompts[i]});
          view.render();
          this.$el.append( view.$el );
        }
    }
});
