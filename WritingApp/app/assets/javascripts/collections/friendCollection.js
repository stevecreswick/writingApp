var app = app || {};

app.FriendCollection = Backbone.Collection.extend({
  model: app.Friend,
  url: '/api/friendships'
});
