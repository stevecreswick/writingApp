console.log('post collection loaded');

var app = app || {};

app.PostCollection = Backbone.Collection.extend({
  model: app.Post,
  page: 1,
  genre: 'all',
  url: function(){
    return "/api/posts/paginated/" + this.genre + "/" + this.page
  }
});
