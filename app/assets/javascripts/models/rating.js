var app = app || {};

app.Rating = Backbone.Model.extend({
  postId: 0,
  url: function() {
    return '/api/posts/' + this.postId + '/ratings';
  },

});
