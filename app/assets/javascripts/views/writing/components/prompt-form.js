var app = app || {};

app.WritingPagePromptForm = Backbone.View.extend({
  tagName: 'div',
  className: 'prompt-form',

  bindPromptDescription: function(){
    var scope = this;
    $( "#choose-type" ).change(function() {
      scope.changePromptDescription( $('#choose-type').val() );
    });

  },

  bindHeadline: function(){
    var scope = this;
    $( "#post-word-count" ).change(function() {
      console.log('yo');
      var words = $('#post-word-count').val();
      console.log(words);
      scope.$el.find(".start-writing").html("You are " + words + " away from being a better writer.")
      // scope.changePromptDescription( $('#choose-type').val() );
    });

  },

  changePromptDescription: function(promptType){

    var $description = this.$el.find("#prompt-description");

    if (promptType === "Start My Sentences") {
      $description.html("Write a story using a random word to start each sentence.  Typing a period and space will generate a new word.");
    } else if (promptType === "reddit") {
      $description.html("Write a story using a random writing prompt submitted to /r/writingprompts");
    } else if (promptType === "Classic First Sentence") {
      $description.html("Write a story using the first sentence from a classic work.");
    } else if (promptType === "Answer What If") {
      $description.html("Write a story about what would happen if...");
    }
  },

  renderPrompt: function(e){

      var scope = this;

      e.preventDefault();

      app.promptType = $('#choose-type').val();
      app.requiredWords = $('#post-word-count option:selected').data('value');

      scope.getPrompt();

      $('#prompt-instrustion').html(this.promptInstruction);
      this.$el.find('#prompt-container').show();

      this.$('.start').remove();
      var $icon = $('<i>').addClass('fa fa-pencil fa-fw');
      var buttonHTML = "&nbsp; Write"
      var $start = $('<a>').addClass('btn btn-default btn-raised btn-info start');

      $start.append( $icon, buttonHTML);

      this.$('#start-writing-container').append( $start );

    },

    getPrompt: function() {

      var writingPrompts = new app.WritingPromptCollection();
      var promptPainter = new app.WritingPromptListView({
        collection: writingPrompts,
        el: $('#prompt-container')
      });


      if (app.promptType === 'Start My Sentences'){
        writingPrompts.url = "/api/writing_prompts/one_word"
        writingPrompts.fetch({url: writingPrompts.url, async:false});
      } else if (app.promptType === 'Answer What If'){
        writingPrompts.url = "/api/writing_prompts/what_if"
        writingPrompts.fetch({url: writingPrompts.url, async:false});
      } else if (app.promptType === 'Classic First Sentence'){
        writingPrompts.url = "/api/writing_prompts/first_sentence"
        writingPrompts.fetch({url: writingPrompts.url, async:false});
      } else if (app.promptType === 'reddit'){
        writingPrompts.url = "/api/writing_prompts/reddit"
        var newPrompt = writingPrompts.fetch({url: writingPrompts.url, async:false}).done(function(){
        });
      } else {
        console.log('no url for this type : ' + app.promptType);
      }

      this.prompt = writingPrompts.models[0].get('prompt');
      this.type = app.promptType;

      this.promptInstruction = this.getPromptInstruction({
        "type": this.type,
        "wordCount": app.requiredWords,
        'prompt': this.prompt
      });


    },


});
