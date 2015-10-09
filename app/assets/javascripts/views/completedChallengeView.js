var app = app || {};

app.CompletedChallengeView = Backbone.View.extend({
  tagName: 'div',
  className: 'challenge-view',
  template: _.template( $('#completed-challenge-template').html() ),

  initialize: function(){
    this.listenTo( this.model, 'change', this.render );
  },
  render: function(){
    this.$el.empty();
    var html = this.template( this.model.toJSON() );
    var $html = $( html );
    this.$el.append( $html );
  }
});
