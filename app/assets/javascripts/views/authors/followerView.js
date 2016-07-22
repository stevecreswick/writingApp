var app = app || {};

app.FollowerView = Backbone.View.extend({
  tagName: 'div',
  className: 'follower-view',
  template: _.template( $('#follower-view-template').html() ),
  initialize: function(){
  },
  render: function(){
    this.$el.empty();
    var html = this.template( this.model.toJSON() );
    var $html = $( html );
    this.$el.append( $html );
  }

});
