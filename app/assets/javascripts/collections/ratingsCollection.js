var app = app || {};

app.RatingsCollection = Backbone.Collection.extend({
  model: app.Rating,
  postId: 0,
  url: function() {
    return '/api/posts/' + this.postId + '/ratings';
  },
});
