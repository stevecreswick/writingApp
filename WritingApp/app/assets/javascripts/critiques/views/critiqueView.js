console.log('critique view');

var app = app || {};

app.CritiqueView = Backbone.View.extend({
  tagName: 'div',
  className: 'critique-view',
  template: _.template( $('#critique-template').html() ),
  initialize: function(){
    this.listenTo( this.model, 'change', this.render );
  },
  render: function(){
    this.$el.empty();
    var html = this.template( this.model.toJSON() );
    var $html = $( html );
    this.$el.append( $html );
  },
  events:{
    // Add a DELETE EVENT
  }
});
