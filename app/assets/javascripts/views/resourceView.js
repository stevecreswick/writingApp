var app = app || {};

app.ResourceView = Backbone.View.extend({
  tagName: 'div',
  className: 'resource-view',
  template: _.template( $('#resource-view-template').html() ),
  initialize: function(){
  },
  render: function(){
    this.$el.empty();
    var html = this.template( this.model.toJSON() );
    var $html = $( html );
    this.$el.append( $html );
  }

});
