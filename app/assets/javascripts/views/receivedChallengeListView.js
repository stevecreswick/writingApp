var app = app || {};

app.ReceivedChallengeListView = Backbone.View.extend({
  initialize: function() {
    this.listenTo(this.collection, 'add', this.render);
  },
  render: function(){
    console.log('received challenges rendering');
    this.$el.empty();
    var $challengesHeader = $('<h1>').text('Received Challenges');
    this.$el.append($challengesHeader);

    var username = $('#current_id').val();

      var challenges = this.collection.models;

      var receivedChallenges = challenges.filter(function (challenge) {
        return challenge.sender !== username;
      });

      var view;

        for (var i = 0; i < receivedChallenges.length; i++) {
                // if (receivedChallenges[i].get('status') === 'Accepted') {
                  // console.log('Accepted Challenge');
                //   view = new app.CompletedChallengeView({model: receivedChallenges[i]});
                // } else {
                //   console.log('Open Challenge');
                  view = new app.ReceivedChallengeView({model: receivedChallenges[i]});
                // }

                view.render();
                this.$el.append( view.$el );

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
