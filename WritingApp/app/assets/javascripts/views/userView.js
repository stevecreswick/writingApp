var app = app || {};

app.UserView = Backbone.View.extend({
  tagName: 'div',
  className: 'user-view',
  template: _.template( $('#user-view-template').html() ),
  initialize: function(){

  },
  render: function(){
    this.$el.empty();
    var html = this.template( this.model.toJSON() );
    var $html = $( html );
    this.$el.append( $html );
  }

});
