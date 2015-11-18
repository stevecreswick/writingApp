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
  updateView: function(){
    console.log('update view called');
    this.remove();
    this.render();
  },
  minWords: null,
  getPrompt: function(e){
      e.preventDefault();
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

      writingPrompts.fetch({url: writingPrompts.url, async:false});

      // Record Prompt
      this.prompt = writingPrompts.models[0].get('prompt');
      console.log( this.prompt );
      this.type = writingPrompts.models[0].get('prompt_type');
      console.log( this.type );

      // Resize Prompt Button and Add Start
      this.$(".render-prompt").css({'width': '50%'}).html("New Prompt");
      this.$('.start').remove();

      var button = $('<button>').addClass('btn btn-primary btn-success start').html('Start');

      this.$('.post-button-container').append(button)
      // this.$el.append(button);
    },
    renderWritingForm: function(e){
      var newPost = this.$el.find('.new-post-box');
      console.log(newPost);
      newPost.css({"display": "none", "z-index": "-2"});
      var newPrompt = this.createPrompt();
      console.log(this.prompt);
      console.log(this.type);

      //
      // console.log(this.minWords);
      // if (this.minWords){
      //   console.log('already have word count');
      // } else if (this.minWords === null) {
      //   this.minWords = $('#post-word-count').val();
      //   console.log(this.minWords);
      // } else {
      //   console.log('else');
      // }

      e.preventDefault();
      console.log(newPrompt);

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
      this.checkWordCount(newPrompt);

    },
    bindWritingFormSubmit: function(newPrompt){
      var scope = this;
      $('form#create-post').on('submit', function(e){
        e.preventDefault();

        var newMessage = scope.$('#post-editor').first().eq(0).children().eq(0).children().eq(0).html();
        var newTitle = scope.$('#post-title').val();

        // Find Word Count
        var message = scope.$('#post-editor').find('.ql-editor').text();
        var messageLength = message.match(/\S+/g).length;

        // If the message is equal to or longer than the chosen word count -> Submit The post
        if (messageLength >= newPrompt.wordCount) {

          app.posts.create({
            title: newTitle,
            message: newMessage,
            word_count: messageLength,
            prompt: newPrompt.prompt,
            prompt_word_count: newPrompt.wordCount,
            prompt_type: newPrompt.type,
            model_url: newPrompt.url,
            genre: newPrompt.genre},
            {wait:true});

          app.pagePainter.renderMain();
          // scope.render();
          scope.$el.css({'height': 'auto'})
        } else {

          scope.$('#post-error').text('Not Long Enough')

        }

      });

    },
    createPrompt: function(){
      // this.prompt = this.prompt || $('.prompt-text').text();
      // this.wordCount = this.wordCount || $('#post-word-count').val();
      // this.type = this.type || $('#choose-type').val();
      // this.genre = this.genre || $('#choose-genre').val();
      //
      console.log(this.prompt);
      // console.log(this.wordCount);
      // console.log(this.type);
      // console.log(this.genre);

      var newPrompt = newPrompt || {
        prompt:  this.$el.find('.prompt-text').text(),
        wordCount: $('#post-word-count').val(),
        type: $('#choose-type').val(),
        genre: $('#choose-genre').val()
      };

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

      return newPrompt;
    },

    checkWordCount: function(newPrompt){
      this.wordCount = 0;
      var scope = this;
      $('#post-editor').on('keyup', function(){
        var text = scope.$el.find('#post-editor').find('.ql-editor').text();
        this.wordCount = text.match(/\S+/g).length;
        $('.character-count').html( this.wordCount );

        var progressBar = scope.$el.find('#word-count-progress');

        var changeWidth = (this.wordCount / newPrompt.wordCount ) * 100;
        var newWidth = changeWidth + "%";

        if (changeWidth <= 100) {
          progressBar.css({"width": newWidth});
        }

      });


    },

    updateProgress: function(wordCount){
      console.log('you');
      var progressBar = scope.$el.find('#word-count-progress');
      console.log(progressBar);



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
      console.log('rendering');

      var fullEditor = new Quill('#post-editor', {
        modules: {
            'toolbar': { container: '#post-toolbar' },
            'link-tooltip': true,
        },
        theme: 'snow'
      });
    }

});
