console.log('post collection loaded');

var app = app || {};

app.PostCollection = Backbone.Collection.extend({
  model: app.Post,
  url: '/api/posts'
});
