
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
    this.bindWordCount();
  },
  events:{
    'click .remove-challenge': 'removeChallenge',
    'click .accept-challenge': 'submitResponse'
  },
  removeChallenge: function(){
    console.log('remove challenge clicked');
    var urlModel = '/api/friendships/' + this.model.get('friendship_id') + '/challenges/' + this.model.get('id');
    console.log(urlModel);

    this.model.destroy({"url": urlModel});

    this.$el.remove();
  },
  acceptChallenge: function(){
    // app.acceptChallengePainter = new app.AcceptChallengeFormView({
    //   el: $('#left-pane'),
    //   model: this.model
    // });
    console.log(this.model.get('prompt'));
    app.acceptChallengePainter.render();
  },

  submitResponse: function(){
    var newMessage = this.$el.find('#challenge-answer').val();

    var urlModel = '/api/friendships/' + this.model.get('friendship_id') + '/challenges/' + this.model.get('id');

    console.log( urlModel );
    console.log(newMessage);
    // var message = scope.$('#challenge-editor').find('.ql-editor').text();
    var messageLength = newMessage.length;
    var wordCount = this.model.get("word_count");

    var urlModel = "/api/friendships/" + this.model.get("friendship_id") + "/challenges/" + this.model.get("id");

    if (messageLength >= wordCount) {
      this.model.url = urlModel;
      this.model.set({'message': newMessage, 'status': 'Accepted'});
      this.model.save();
      this.$el.remove();
    } else {
      this.$el.find('#received-challenge-error').text('not long enough');
    }
  },

  bindWordCount: function(){
    this.wordCount = 0;
    var scope = this;

    var form = $("<textarea>").addClass("form-control").attr("id", "challenge-answer");
    this.$el.find("#challenge-form-holder").append(form);

    var i = 0

    this.$el.find("#challenge-answer").on("keyup", function(){
      console.log(this);
      scope.wordCount = $(this).val().match(/\S+/g).length;
      // var text = scope.$el.find('#post-editor').find('.ql-editor').text();
      // app.wordCount = text

      scope.$el.find('#challenge-required-word-count').html( scope.wordCount );

      console.log("wordCount" + scope.wordCount);
      i++;
    });

  }

});
