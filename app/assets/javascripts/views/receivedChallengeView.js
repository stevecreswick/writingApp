
app.ReceivedChallengeView = Backbone.View.extend({
  tagName: 'div',
  className: 'received-challenge',
  template: _.template( $('#received-challenge-template').html() ),

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
    'click button.remove-challenge': 'removeChallenge',
    'click button.accept-challenge': 'acceptChallenge'
  },
  removeChallenge: function(){
    console.log('remove challenge clicked');
    var urlModel = '/api/friendships/' + this.model.get('friendship_id') + '/challenges/' + this.model.get('id');
    console.log(urlModel);

    this.model.destroy({"url": urlModel});
    
    this.$el.remove();
  },
  acceptChallenge: function(){
    app.acceptChallengePainter = new app.AcceptChallengeFormView({
      el: $('#left-pane'),
      model: this.model
    });
    console.log(this.model.get('prompt'));
    app.acceptChallengePainter.render();
  }

});
