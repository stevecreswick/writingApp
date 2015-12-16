var app = app || {};

app.CompletedChallengeCollection = Backbone.Collection.extend({
  model: app.Challenge,
  url: '/api/challenges/completed'
});
