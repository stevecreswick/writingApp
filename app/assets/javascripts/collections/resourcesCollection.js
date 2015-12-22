var app = app || {};

app.ResourcesCollection = Backbone.Collection.extend({
  model: app.Resource,
  url: "/api/writing_tips"
});
