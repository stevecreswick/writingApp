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
    'click button.accept-challenge': 'acceptChallenge'
  },

  removeChallenge: function(){
    console.log('remove challenge clicked');
    this.model.destroy();
    this.$el.remove();
  },
  acceptChallenge: function(){
    console.log('accept challenge clicked');
    app.acceptChallengePainter = new app.AcceptChallengeFormView({
      el: $('#left-pane'),
      model: this.model
    });
    console.log(this.model.get('prompt'));
    app.acceptChallengePainter.render();
  }
});
