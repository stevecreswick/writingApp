var app = app || {};

app.SentChallengeCollection = Backbone.Collection.extend({
  model: app.Challenge,
  url: '/api/challenges/sent'
});
