var app = app || {};

app.ReceivedChallengeCollection = Backbone.Collection.extend({
  model: app.Challenge,
  url: '/api/challenges/received'
});
