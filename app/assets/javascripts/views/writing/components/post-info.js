var app = app || {};

app.WritingPostInfo = Backbone.View.extend({
  tagName: 'div',
  className: 'prompt-form',
  template: _.template( $('#new-template').html() ),

});
