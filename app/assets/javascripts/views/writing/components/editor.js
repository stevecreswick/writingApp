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
    this.promptInstruction;

    $('#prompt-instruction').html(this.promptInstruction);
    $("#prompt").html( app.currentPrompt );

    this.renderEditor();
    this.listenToForm();

    $('.ql-editor').children().last().html( app.currentPrompt.charAt(0).toUpperCase() + app.currentPrompt.slice(1) + " ");


    // Start the Timer
    this.startClock();

    // Put in the starting word count
    $('#current-word-count').eq(0).html( app.wordCount + "/" + app.requiredWords );

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
            $('.post-error').html('Error: A title is required.');

          } else if (messageLength >= app.requiredWords) {

            var $stopwatch = $('#stopwatch');
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
            this.$('.post-error').text('Error: Post does not meet required word count.');
          }

      },

      updateWordCountStatus: function(wordCount){

          var progress = Math.floor( (wordCount / app.requiredWords) * 100 ) + "%";
          console.log(progress);
          this.$el.find('.progress-bar').css({"width": progress});
      },

      listenToForm: function(){
        app.wordCount = 0;
        var scope = this;

        $('#post-editor').on('keyup', function(e){

          var text = scope.$el.find('#post-editor').find('.ql-editor').text();
          app.wordCount = text.match(/\S+/g).length;
          $('#current-word-count').eq(0).html( app.wordCount + "/" + app.requiredWords );

          scope.updateWordCountStatus(app.wordCount);

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
          console.log("period then space");

          var currentPost = $('#post-editor').find('.ql-editor').html();

          this.nextWord = new app.WritingPromptCollection();
          this.nextWord.url = "/api/writing_prompts/one_word";
          this.nextWord.fetch({url: this.nextWord.url, async:false});

          var nextWord = this.nextWord.models[0].get('prompt');

          var startWith = nextWord.charAt(0).toUpperCase() + nextWord.slice(1);
          var newWord = $('.ql-editor').children().last();

          $(newWord).append(startWith + " ");

          this.setCaret();

        }

        app.lastKey = e.keyCode;


      },

      setCaret: function() {
      var el = $('#post-editor').find('.ql-editor');
      var range = document.createRange();
      console.log(range);
      var sel = window.getSelection();
      console.log(sel);
      var node = el.children().last();

      console.log(node[0]);
      console.log($(node).length);

      range.setStart(node[0], $(node).length + 1 );
      range.collapse(true);
      sel.removeAllRanges();
      sel.addRange(range);
      el.focus();
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
