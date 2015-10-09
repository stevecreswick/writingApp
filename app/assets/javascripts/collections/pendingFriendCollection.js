var app = app || {};

app.PendingFriendCollection = Backbone.Collection.extend({
  model: app.Friend,
  url: '/api/friendships/pending'
});
