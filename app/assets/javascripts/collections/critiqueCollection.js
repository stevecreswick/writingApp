var app = app || {};

app.CritiqueCollection = Backbone.Collection.extend({
  model: app.Critique,
  page: 0,

  url: function(){
    return "/api/posts/" + this.postId + "/critiques/query/" + this.page;
  }
});
