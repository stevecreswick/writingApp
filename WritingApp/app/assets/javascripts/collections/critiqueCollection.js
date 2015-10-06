console.log('critique collection');
var app = app || {};

app.CritiquesCollection = Backbone.Collection.extend({
  model: app.Critique
});
