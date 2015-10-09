console.log('challenge collection');
var app = app || {};

app.ChallengeCollection = Backbone.Collection.extend({
  model: app.Challenge
});
