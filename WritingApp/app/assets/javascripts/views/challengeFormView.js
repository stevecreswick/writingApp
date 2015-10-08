var app = app || {};

app.challengeFormView = Backbone.View.extend({
  tagName: 'div',
  className: 'challenge-form',
  template: _.template( $('#challenge-form-template').html() ),
  initialize: function(){
    this.bindSlider();
  },
  render: function(){
    this.$el.empty();
    var html = this.template();
    var $html = $( html );
    this.$el.append( $html );
  },
  events:{
    'click button.render-challenge': 'getChallenge'
  },
  getChallenge: function(){
      console.log('prompt render');

      var writingPrompts = new app.WritingPromptCollection();

      var promptPainter = new app.WritingPromptListView({
        collection: writingPrompts,
        el: $('#challenge-container')
      });

      writingPrompts.fetch();
    },
    createChallenge: function(){
      var newPrompt = {
        prompt:  $('.prompt-text').text(),
        wordCount: $('#post-word-count').val(),
        type: $('#choose-type').val()
      }
      return newPrompt;
    },
    sendChallenge: function(){

    }
    // checkCharacterCount: function(){
    //   this.characters = $('textarea#post-body').val().length;
    //   $('.character-count').html( this.characters );
    // },
    bindSlider: function(){
      $( "#slider-challenge-word-count" ).slider({
           range: "min",
           min: 50,
           max: 500,
           step: 50,
           slide: function( event, ui ) {
                $( "#word-count" ).html( ui.value );
                $("#challenge-word-count").val(ui.value);
           }
      });
    }

});
