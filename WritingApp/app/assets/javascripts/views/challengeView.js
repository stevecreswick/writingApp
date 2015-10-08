var app = app || {};

app.ChallengeView = Backbone.View.extend({
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

// Critique Events
  events:{
    'click button.remove-challenge': 'removeChallenge',
  },

  removeChallenge: function(){
    console.log('remove challenge clicked');
    this.model.destroy();
    this.$el.remove();
  }
});
