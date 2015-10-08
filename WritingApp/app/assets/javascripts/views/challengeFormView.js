var app = app || {};

app.ChallengeFormView = Backbone.View.extend({
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
    this.bindSlider();
    this.bindSubmit();
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
    bindSubmit: function(){
        $('form#create-challenge').on('submit', function(e){
          e.preventDefault();
          var newChallenge = $('.prompt-text').html();
          var wordCount = $('#challenge-word-count').val();
          console.log(newChallenge);
          console.log(wordCount);

          // app.posts.create({message: newMessage, prompt: prompt, word_count: wordCount, prompt_type: type},{wait:true});
        });
    },
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
