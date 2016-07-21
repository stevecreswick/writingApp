var app = app || {};

app.Post = Backbone.Model.extend({
  parse: function (data) {
    if (_.isObject(data.results)) {
        return data.entries;
    } else {
        return data;
    }
},
url: function() {
  return "/api/posts/" + this.get( 'data' )[ 'id' ];
}
});
