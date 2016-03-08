
var app = app || {};

app.User = Backbone.Model.extend({
  id: null,
  url: function() {
    return "/users/show/" + this.id;
  }
});
