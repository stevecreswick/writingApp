var app = app || {};

app.FriendCollection = Backbone.Collection.extend({
  model: app.Friendship,
  url: '/users/friends'
});
