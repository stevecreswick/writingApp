var app = app || {};

app.promptFormView = Backbone.View.extend({
  tagName: 'div',
  className: 'prompt-form',
  template: _.template( $('#new-template').html() ),
  wordCount: 0,
  totalTime: 0,
  seconds: 0,
  minutes: 0,
  hours: 0,
  newPrompt: {},
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
    'click button.start': 'renderWritingForm',
    'click span.submit-new-post': 'submitPost',
  },

  getPromptInstruction(options){
    console.log(options);
    if (options.type === "Use One Word") {
      return "Write at least " + options.wordCount + " words, using the word";
    } else if (options.type === "reddit") {
      return "Write at least " + options.wordCount + " words, using the /r/writingprompt";
    }
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
        writingPrompts.fetch({url: writingPrompts.url, async:false});
        console.log(writingPrompts);
      } else if (promptType === 'Answer What If'){
        writingPrompts.url = "/api/writing_prompts/what_if"
        writingPrompts.fetch({url: writingPrompts.url, async:false});
        console.log(writingPrompts);
      } else if (promptType === 'Classic First Sentence'){
        writingPrompts.url = "/api/writing_prompts/first_sentence"
        writingPrompts.fetch({url: writingPrompts.url, async:false});
        console.log(writingPrompts);
      } else if (promptType === 'reddit'){
        writingPrompts.url = "/api/writing_prompts/reddit"
        var newPrompt = writingPrompts.fetch({url: writingPrompts.url, async:false}).done(function(){
          console.log(this);
        });
      } else {
        console.log('no url for this type : ' + promptType);
      }

      // Record Prompt
      this.prompt = writingPrompts.models[0].get('prompt');
      console.log( this.prompt );
      this.type = promptType;
      console.log( this.type );

      this.promptInstruction = this.getPromptInstruction({
        "type": this.type,
        "wordCount": $('#post-word-count').val(),
        'prompt': this.prompt
      });

      this.$el.find('#prompt-review-container').html(this.promptInstruction);
      this.$el.find('#prompt-container').show();

      // Resize Prompt Button and Add Start
      // this.$(".render-prompt").css({'width': '50%'}).html("New Prompt");
      this.$('.start').remove();

      var $start = $('<button>').addClass('btn btn-primary btn-success start').html('Start');

      this.$('#start-writing-container').append( $start );
      // this.$el.append(button);
    },

    renderWritingForm: function(e){
      // Resize the columns
      app.pagePainter.columns("main");

      // Get all the prompt info
      this.newPrompt = this.createPrompt();

      e.preventDefault();
      this.$el.empty();

      var template = _.template( $('#create-post-template').html() );
      var html = template();
      var $html = $( html );
      this.$el.append( $html );

      // Add Prompt Instruction
      this.promptInstruction;
      this.$el.find('#prompt-review-container').html(this.promptInstruction);

      this.$("h5#post-box-type").html( this.newPrompt.prompt )

      $('h5#post-box-word-count').html(this.newPrompt.wordCount)


      this.renderEditor();
      this.checkWordCount(this.newPrompt);

      this.startClock();
    },

    startClock: function(){

      if (app.timer){
        this.stopTimer();
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


        // app.seconds = app.totalTime;

        // console.log(app.totalTime);
        // if(app.totalTime % 60 == 0){
        //   app.seconds = 0;
        //   app.minutes += 1;
        // } else if (app.minutes > 59){
        //   app.minutes = 0;
        //   app.hours += 1;
        // } else {
        //   app.seconds = app.totalTime;
        //   $('#stopwatch').html(app.hours + ':' + app.minutes + ':' + app.seconds);
        // }

    },

    stopTimer: function(){
      clearInterval(app.timer);
      app.timer = null;
      app.totalTime = 0;
      app.seconds = 0;
      app.minutes = 0;
      app.hours = 0;
      console.log('stopped seconds: ' +  app.seconds);
    },

    submitPost: function(){
        var newMessage = this.$('#post-editor').first().eq(0).children().eq(0).html();
        console.log(newMessage);
        var newTitle = this.$('#post-title').val();

        // Find Word Count
        var messageText = this.$('#post-editor').find('.ql-editor').text();
        var messageLength = messageText.match(/\S+/g).length;


        // Check Title / Word Count
        if (newTitle === ""){
          this.$('#post-error').text('No Title');
        } else if (messageLength >= this.newPrompt.wordCount) {

          var $stopwatch = $('#stopwatch');

          // Store the seconds in the post


          // Create a Post
          app.posts.create({

            title: newTitle,
            genre: this.newPrompt.genre,
            message: newMessage,
            word_count: messageLength,
            time_completed: app.totalTime,

            prompt: this.newPrompt.prompt,
            prompt_word_count: this.newPrompt.wordCount,
            prompt_type: this.newPrompt.type,
            model_url: this.newPrompt.url,

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
          this.$('#post-error').text('Not Long Enough');
        }
    },
    createPrompt: function(){
      console.log(this.prompt);


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
        $('h5.header-word-count').html( this.wordCount );

        var progressBar = scope.$el.find('#word-count-progress');

        var changeWidth = (this.wordCount / newPrompt.wordCount ) * 100;
        var newWidth = changeWidth + "%";

        if (changeWidth <= 100) {
          progressBar.css({"width": newWidth});
        }

      });


    },

    // replaceLineBreaks(){
    //   $( ".ql-editor" ).keyup( function() {
    //     $( "#output_div" ).html( $( this ).val().replace(/\n/g, '<br />') );
    //   });
    // },
    //
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
