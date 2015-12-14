var app = app || {};

app.requiredWords = 0;
app.prompt = "";
app.promptType = "";

app.promptFormView = Backbone.View.extend({
  tagName: 'div',
  className: 'prompt-form',
  template: _.template( $('#new-template').html() ),
  minWords: null,
  wordCount: 0,
  totalTime: 0,
  seconds: 0,
  minutes: 0,
  hours: 0,
  newPrompt: {},
  initialize: function(){
  },
  render: function(){
    this.$el.empty();

    var html = this.template();
    var $html = $( html );
    this.$el.append( $html );
  },
  events:{
    'click button.render-prompt': 'getPrompt',
    'click button.start': 'renderWritingForm',
    'click span.publish': 'publishPost'
  },

  getPromptInstruction(options){
    console.log(options);
    if (options.type === "Use One Word") {
      return "Write at least " + options.wordCount + " words, using the word";
    } else if (options.type === "reddit") {
      return "Write at least " + options.wordCount + " words, using the /r/writingprompt";
    }

    // Store Word Count
    app.requiredWords = options.wordCount;
  },

  updateView: function(){
    this.remove();
    this.render();
  },


  getPrompt: function(e){
      var scope = this;
      e.preventDefault();

      app.promptType = $('#choose-type').val();

      app.requiredWords = $('#post-word-count').val();
      console.log( app.requiredWords );

      var writingPrompts = new app.WritingPromptCollection();
      var promptPainter = new app.WritingPromptListView({
        collection: writingPrompts,
        el: $('#prompt-container')
      });

      if (app.promptType === 'Use One Word'){
        writingPrompts.url = "/api/writing_prompts/one_word"
        writingPrompts.fetch({url: writingPrompts.url, async:false});
        console.log(writingPrompts);
      } else if (app.promptType === 'Answer What If'){
        writingPrompts.url = "/api/writing_prompts/what_if"
        writingPrompts.fetch({url: writingPrompts.url, async:false});
        console.log(writingPrompts);
      } else if (app.promptType === 'Classic First Sentence'){
        writingPrompts.url = "/api/writing_prompts/first_sentence"
        writingPrompts.fetch({url: writingPrompts.url, async:false});
        console.log(writingPrompts);
      } else if (app.promptType === 'reddit'){
        writingPrompts.url = "/api/writing_prompts/reddit"
        var newPrompt = writingPrompts.fetch({url: writingPrompts.url, async:false}).done(function(){
          console.log(this);
        });
      } else {
        console.log('no url for this type : ' + app.promptType);
      }

      // Record Prompt
      this.prompt = writingPrompts.models[0].get('prompt');
      this.type = app.promptType;
      console.log(this.prompt);
      console.log(this.type);
      this.promptInstruction = this.getPromptInstruction({
        "type": this.type,
        "wordCount": app.requiredWords,
        'prompt': this.prompt
      });

      $('#prompt-instrustion').html(this.promptInstruction);
      this.$el.find('#prompt-container').show();

      this.$('.start').remove();
      var $start = $('<button>').addClass('btn btn-primary btn-success start').html('Start');
      this.$('#start-writing-container').append( $start );

    },

    renderWritingForm: function(e){

      // Resize the columns
      app.pagePainter.columns("main");
      app.pagePainter.renderWritingSidebar();

      // Render Writing Form From Template
      e.preventDefault();
      this.$el.empty();
      var template = _.template( $('#create-post-template').html() );
      var html = template();
      var $html = $( html );
      this.$el.append( $html );

      // Get all the prompt info
      // this.createPrompt();

      // Add Prompt Instruction
      this.promptInstruction;
      $('#prompt-instrustion').html(this.promptInstruction);
      $("#prompt").html( this.prompt )
      $('h5#required-word-count').html( app.requiredWords )

      // Render Text Editor & Bind To Word Count
      this.renderEditor();
      this.checkWordCount();

      // Start the Timer
      this.startClock();
    },


    startClock: function(){

      if (app.timer){
        this.clearTime();
      }

      var $stopwatch = this.$el.find('#stopwatch');

      app.totalTime = 0;
      app.seconds = 0;
      app.minutes = 0;
      app.hours = 0;

      app.timer = setInterval(this.renderTime, 1000);
      $('#stopwatch').show();

    },

    renderTime: function(){
      app.totalTime++;
      app.hours = Math.floor(app.totalTime / 3600);
      // totalSeconds %= 3600;
      app.minutes = Math.floor(app.totalTime / 60);
      app.seconds = app.totalTime % 60;

      // Create Views to Handle :00, :01, etc.
      var minutesView = app.minutes + ":";
      var hoursView = app.hours + ":";
      var secondsView = app.seconds;


      if (app.minutes < 10){
        minutesView = "0" + app.minutes + ":";;
      }

      if (app.seconds < 10){
        secondsView = "0" + app.seconds;;
      }

      if (app.hours == 0){
        hoursView = ""
      } else if (app.hours < 10) {
        hoursView = "0" + app.hours + ":";
      }

      $('#stopwatch').html(hoursView + minutesView + secondsView);


    },

    clearTime: function(){
      clearInterval(app.timer);
      app.timer = null;
      app.totalTime = 0;
      app.seconds = 0;
      app.minutes = 0;
      app.hours = 0;
      console.log('stopped seconds: ' +  app.seconds);
    },

    publishPost: function(){

      console.log('publishing');
        var newMessage = $('#post-editor').first().eq(0).children().eq(0).html();
        var newTitle = $('#post-title').val();
        var genre = $('#choose-genre').val();
        var prompt = $('#prompt').text();

        // Find Word Count
        var messageText = $('#post-editor').find('.ql-editor').text();
        var messageLength = messageText.match(/\S+/g).length;

        // Check Title / Word Count
        if (newTitle === ""){
          console.log('yo');
          $('p.post-error').html('No Title');
        } else if (messageLength >= app.requiredWords) {
          var $stopwatch = $('#stopwatch');

          // Store the seconds in the post

          console.log(this.newPrompt);
          // Create a Post
          app.posts.create({

            title: newTitle,
            genre: genre,
            message: newMessage,
            word_count: messageLength,
            time_completed: app.totalTime,

            prompt: this.prompt,
            prompt_word_count: app.requiredWords,
            prompt_type: this.type,
            // model_url: this.newPrompt.url,

            },

            {
            url: '/api/posts',
            wait:true,
            async: false
          });

          app.pagePainter.renderMain();
          // this.render();
          this.$el.css({'height': 'auto'});

        } else {
          this.$('p.post-error').text('Not Long Enough');
        }

    },
    // createPrompt: function(){
    //   console.log('creating');
    //
    //   this.newPrompt = {
    //     prompt:  $('.prompt-text').text(),
    //     wordCount: $('#post-word-count').val(),
    //     type: $('#choose-type').val(),
    //   };
    //
    //   console.log(this.newPrompt);
    //
    //   if (this.newPrompt.type === 'One Word'){
    //     console.log('one word');
    //     newPrompt.url = 'one_word'
    //   } else if (this.newPrompt.type === 'What If'){
    //     console.log('what if');
    //     newPrompt.url = 'what_if'
    //   } else if (this.newPrompt.type === 'First Sentence'){
    //     console.log('first');
    //     newPrompt.url = 'first_sentence'
    //   } else {
    //     console.log('no url for this type : ' + this.newPrompt.type);
    //   }
    //
    //   return this.newPrompt;
    // },

    checkWordCount: function(){
      this.wordCount = 0;
      var scope = this;
      $('#post-editor').on('keyup', function(){
        var text = scope.$el.find('#post-editor').find('.ql-editor').text();
        this.wordCount = text.match(/\S+/g).length;
        $('#current-word-count').eq(0).html( this.wordCount );
      });
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
