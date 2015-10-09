var app = app || {};

app.CompletedChallengeListView = Backbone.View.extend({
  initialize: function() {
    this.listenTo(this.collection, 'add', this.render);
  },
  render: function(){
    console.log('completed challenges rendering');
    this.$el.empty();
    var $challengesHeader = $('<h1>').text('Completed Challenges');
    this.$el.append($challengesHeader);
      var challenges = this.collection.models;
      var view;
        for (var i = 0; i < challenges.length; i++) {

          if (challenges[i].get('status') == 'Accepted'){
            view = new app.CompletedChallengeView({model: challenges[i]});
            view.render();
            this.$el.append( view.$el );
          } else {
            console.log('open challenge: ' + challenges[i].get('id'));
          }
        }
    }
});

// var username = $('li#username').html()
// console.log(username);

// if (challenges[i].get('sender') !== username ){
// we want it to render as Received
// } else if (challenges[i].get('sender') === username ) {
// we want it to render a Sent View
// }
