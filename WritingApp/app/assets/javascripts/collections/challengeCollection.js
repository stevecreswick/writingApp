console.log('challenge collection');
var app = app || {};

app.ChallengesCollection = Backbone.Collection.extend({
  model: app.Challenge
});
