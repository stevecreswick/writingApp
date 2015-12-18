var app = app || {};

app.AcceptedChallengeView = Backbone.View.extend({
  tagName: 'div',
  className: 'challenge-view',
  template: _.template( $('#challenge-template').html() ),

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
  }

});
