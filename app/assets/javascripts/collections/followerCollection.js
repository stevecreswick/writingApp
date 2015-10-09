var app = app || {};

app.FollowerCollection = Backbone.Collection.extend({
  model: app.User,
  url: '/users/followers'
});
