var app = app || {};

app.WritingPageEditor = Backbone.View.extend({
  tagName: 'div',
  className: 'prompt-form',
  template: _.template( $('#new-post-template').html() ),

  events: {
    'click a.publish': 'publishPost'
  },

  render: function(){

    this.$el.empty();
    this.$el.append( $( this.template() ) );

    $("#prompt").html( app.currentPrompt );

    this.renderEditor();
    this.listenToForm();
    this.startClock();

    $('#current-word-count').eq(0).html( app.wordCount + "/" + app.requiredWords );

  },


// Seperate Timer into its own view in the shared section
  startClock: function() {
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

  wordsPerMinute: function(){
    var minutes = app.totalTime / 60;

    var wpm = Math.floor( app.wordCount / minutes );

    $("#current-wpm-count").html(wpm)
  },

  renderTime: function(){
    app.totalTime++;
    app.hours = Math.floor(app.totalTime / 3600);
    // totalSeconds %= 3600;
    app.minutes = Math.floor(app.totalTime / 60);
    app.seconds = app.totalTime % 60;

  // WPM
    var minutes = app.totalTime / 60;

    var wpm = Math.floor( parseInt(app.wordCount) / minutes );

        $("#current-wpm-count").html(wpm)

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
      },

      publishPost: function(){

        var newMessage = $('#post-editor').first().eq(0).children().eq(0).html(),
            postTitle = $('#post-title').val(),
            genre = $('#choose-genre').val(),
            prompt = $('#prompt').text(),
            rawText = $('#post-editor').find('.ql-editor').text(),
            messageLength = rawText.match(/\S+/g).length;

        if ( postTitle.length > 0
            && messageLength >= app.requiredWords )
          {

            var $stopwatch = $('#stopwatch');
            console.log('thype' + app.promptType);
            app.posts.create({

              title: postTitle,
              genre: genre,
              message: newMessage,
              word_count: messageLength,
              time_completed: app.totalTime,

              prompt: app.currentPrompt,
              prompt_word_count: app.requiredWords,
              prompt_type: app.promptType,
              // model_url: this.newPrompt.url,
              },

              {
              url: '/api/posts',
              wait:true,
              async: false
            });

            app.pagePainter.render();
            // this.render();
            this.$el.css({'height': 'auto'});

          }

        // No Title
        else if ( postTitle.length === 0 )
        {
          $('.post-error').html('Error: A title is required.');
          $('.post-error').show();
        }

        // Not Long Enough
        else {
          $('.post-error').text('Error: Post does not meet required word count.');
          $('.post-error').show();
        }

      },

      updateSubmitStatus: function(wordCount){

          this.progress = Math.floor(
            (wordCount / app.requiredWords) * 100
          );

          this.$el.find('.progress-bar')
            .css({"width": ( this.progress + "%" )});

          this.progress >= 100 ?
            this.$el.find('.publish').eq(0)
              .addClass('publish-enabled') :
            this.$el.find('.publish').eq(0)
              .removeClass('publish-enabled');
      },


      listenToForm: function(){
        app.wordCount = 0;
        var scope = this;

        $( '#post-editor' ).on('keyup', function(e){

          var text = scope.$el.find( '#post-editor' ).find( '.ql-editor' ).text();
          app.wordCount = text.match(/\S+/g).length;
          $('#current-word-count').eq(0).html( app.wordCount + "/" + app.requiredWords );

          scope.updateSubmitStatus( app.wordCount );

          if (app.promptType === "Start My Sentences"){
            scope.addWord(e);
          }

        });

      },

      addWord: function(e){
        var periodKey = 190;
        var spaceKey = 32;

        app.currentKey = e.keyCode;

        if ( app.currentKey === spaceKey && app.lastKey === periodKey )   {

          var currentPost = $('#post-editor').find('.ql-editor').html();

          this.nextWord = new app.WritingPromptCollection();
          this.nextWord.url = "/api/writing_prompts/one_word";
          this.nextWord.fetch({url: this.nextWord.url, async:false});

          var nextWord = this.nextWord.models[0].get('prompt');

          var startWith = nextWord.charAt(0).toUpperCase() + nextWord.slice(1);

          $("#prompt").empty();
          $("#prompt").append( startWith );
        }

        app.lastKey = e.keyCode;

      },

      renderEditor: function(){
        var fullEditor = new Quill('#post-editor', {
          modules: {
              'toolbar': { container: '#post-toolbar' },
              'link-tooltip': true,
          },
          theme: 'snow'
        });

        // var editor = new MediumEditor('.editable', {
        //   placeholder: {
        //     text: 'Type your text',
        //     hideOnClick: true
        //   },
        //
        //   keyboardCommands: {
        //       /* This example includes the default options for keyboardCommands,
        //          if nothing is passed this is what it used */
        //       commands: [
        //           {
        //               command: 'bold',
        //               key: 'b',
        //               meta: true,
        //               shift: false
        //           },
        //           {
        //               command: 'italic',
        //               key: 'i',
        //               meta: true,
        //               shift: false
        //           },
        //           {
        //               command: 'underline',
        //               key: 'u',
        //               meta: true,
        //               shift: false
        //           }
        //       ],
        //   },
        //
        //   paste: {
        //    cleanPastedHTML: true,
        //    cleanAttrs: ['style', 'dir'],
        //    cleanTags: ['label', 'meta']
        //   }
        //
        // });

      }

});
