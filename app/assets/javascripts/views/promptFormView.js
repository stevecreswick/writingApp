var app = app || {};

app.promptFormView = Backbone.View.extend({
  tagName: 'div',
  className: 'prompt-form',
  template: _.template( $('#prompt-form-template').html() ),
  wordCount: 0,
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
    'click button.render-prompt': 'getPrompt',
    'click button.start': 'renderWritingForm'
  },
  getPrompt: function(e){
      e.preventDefault(e);
      console.log('prompt render');
      var promptType = $('#choose-type').val();
      var writingPrompts = new app.WritingPromptCollection();
      var promptPainter = new app.WritingPromptListView({
        collection: writingPrompts,
        el: $('#prompt-container')
      });

      if (promptType === 'Use One Word'){
        writingPrompts.url = "/api/writing_prompts/one_word"
      } else if (promptType === 'Answer What If'){
        writingPrompts.url = "/api/writing_prompts/what_if"
      } else if (promptType === 'Classic First Sentence'){
        writingPrompts.url = "/api/writing_prompts/first_sentence"
      } else {
        console.log('no url for this type : ' + promptType);
      }



      writingPrompts.fetch({async:false});

      // Resize Prompt Button and Add Start
      this.$(".render-prompt").css({'width': '50%'}).html("New Prompt");
      this.$('.start').remove();

      var button = $('<button>').addClass('btn btn-primary btn-success start').html('Start');

      this.$('.post-button-container').append(button)
      // this.$el.append(button);
    },
    renderWritingForm: function(e){
      e.preventDefault();
      var newPrompt = this.createPrompt();
      this.$el.css({'height': '75%'})
      this.$el.empty();
      var template = _.template( $('#create-post-template').html() );
      var html = template();
      var $html = $( html );
      this.$el.append( $html );

      if (newPrompt.type === "Use One Word"){
            this.$("h5#post-box-type").html("Write at least " + newPrompt.wordCount + " characters using the word " + "<span style='color:red; font-size: 1.4em'>" + newPrompt.prompt + "</span>");
      } else if (newPrompt.type === "Answer What If"){

      } else if (newPrompt.type === "Classic First Sentence"){

      }
      this.$("h4#post-genre").html("New " + newPrompt.genre);
      this.$("h4#post-box-word-count").html();

      this.$("h4#post-box-word-count").html(newPrompt.wordCount);

      this.renderEditor();
      this.bindWritingFormSubmit(newPrompt);
      this.checkCharacterCount();

    },
    bindWritingFormSubmit: function(newPrompt){
      var scope = this;
      $('form#create-post').on('submit', function(e){
        e.preventDefault();
        var newMessage = scope.$('#post-editor').first().eq(0).html();
        var message = scope.$('#post-editor').find('.ql-editor').text();
        var messageLength = message.length;

        console.log('word count ' + messageLength);

        console.log(newMessage);
        // If the message is equal to or longer than the chosen word count -> Submit The post
        if (messageLength >= newPrompt.wordCount) {
          console.log('longer than word count');
          app.posts.create({message: newMessage, prompt: newPrompt.prompt, word_count: newPrompt.wordCount, prompt_type: newPrompt.type, model_url: newPrompt.url, genre: newPrompt.genre},{wait:true});

          scope.render();
          scope.$el.css({'height': 'auto'})
        } else {
          scope.$('#post-error').text('not long enough')
          console.log('not longer than wc');
        }

        // Still need to re render page or clear form
        // app.pagePainter.renderPromptForm();
      });

    },
    createPrompt: function(){
      var newPrompt = {
        prompt:  $('.prompt-text').text(),
        wordCount: $('#post-word-count').val(),
        type: $('#choose-type').val(),
        genre: $('#choose-genre').val()

      }

      if (newPrompt.type === 'One Word'){
        console.log('one word');
        newPrompt.url = 'one_word'
      } else if (newPrompt.type === 'What If'){
        console.log('what if');
        newPrompt.url = 'what_if'
      } else if (newPrompt.type === 'First Sentence'){
        console.log('first');
        newPrompt.url = 'first_sentence'
      } else {
        console.log('no url for this type : ' + newPrompt.type);
      }

      console.log(newPrompt.genre);
      console.log('creating prompt');
      return newPrompt;
    },
    checkCharacterCount: function(){
      this.characters = 0;
      $('#post-editor').on('keyup', function(){
        this.characters = $('#post-editor').find('.ql-editor').text();
        console.log( this.characters.length );
        // this.characters = $('#post-editor').text().length;
        $('.character-count').html( this.characters.length );
      });
    },
    bindSlider: function(){
      $( "#slider-word-count" ).slider({
           range: "min",
           min: 25,
           max: 500,
           step: 25,
           slide: function( event, ui ) {
                $( "#word-count" ).html( ui.value );
                $("#post-word-count").val(ui.value);
           },

      });

    },
    stopWatch: function(){

    },
    renderEditor: function(){
      var fullEditor = new Quill('#post-editor', {
        modules: {
            'toolbar': { container: '#post-toolbar' },
            'link-tooltip': true,
        },
        theme: 'snow'
      });
    }

});
