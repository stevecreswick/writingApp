var app = app || {};

app.AcceptChallengeFormView = Backbone.View.extend({
  tagName: 'div',
  className: 'challenge-form',
  template: _.template( $('#accept-challenge-form-template').html() ),
  initialize: function(){
    console.log(this.model);
  },
  render: function(){
    this.$el.empty();
    var html = this.template();
    var $html = $( html );
    this.$el.append( $html );
    this.$('#challenge-container').html("Prompt: " + this.model.get('prompt'));
    this.$('#challenge-word-count').html("Word Count: " + this.model.get('word_count'))
    this.bindSubmit();
  },
  events:{
  },
  bindSubmit: function(){
      var scope = this;

      $('form#challenge-accept-form').on('submit', function(e){
        e.preventDefault();
        console.log('the remix to submission');
        console.log(scope.model);
        var newMessage = $(this).find("#challenge-body").val();
        console.log(newMessage);
        scope.model.set({'message': newMessage});
        scope.model.save();

      });
  },
});
