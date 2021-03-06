var app = app || {};

app.ChallengeListView = Backbone.View.extend({
  initialize: function() {
    this.listenTo(this.collection, 'add', this.render);
  },
  render: function(){
    this.$el.empty();
      var challenges = this.collection.models;
      var view;
        for (var i = 0; i < challenges.length; i++) {

          if (challenges[i].get('status') == 'Accepted'){
            console.log('accepted challenge: ' + challenges[i].get('id'));
          } else {
          view = new app.ChallengeView({model: challenges[i]});
          view.render();
          this.$el.append( view.$el );
          }
        }
    }
});
