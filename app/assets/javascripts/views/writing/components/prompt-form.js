var app = app || {};

app.WritingPagePromptForm = Backbone.View.extend({
  tagName: 'div',

  events: {
    'click a.render-prompt': 'renderPrompt',
    'click a.start': 'renderWritingForm'
  },

  initialize: function(){
    console.log('prompt form loaded');

    this.bindPromptInstruction();
    this.bindHeadline();
    this.createPrompt();
  },

  createPrompt: function() {

    this.currentPrompt = new app.WritingPromptCollection();
    this.currentPromptView = new app.WritingPromptListView({
      collection: app.currentPrompt,
      el: $('#prompt-container')
    });

    console.log(this.currentPrompt);
  },

  bindPromptInstruction: function(){
    var scope = this;

    $( "#choose-type" ).change(function() {
      scope.changePromptDescription( $('#choose-type').val() );
    });

  },

  renderWritingForm: function(){

    app.WritingPageController.components.editor.render();

  },

  bindHeadline: function(){
    var scope = this;

    $( "#post-word-count" ).change(
      function() {
      var words = $('#post-word-count').val();
      scope.$el.find(".start-writing").html("You are " + words + " away from being a better writer.")
      }
    );

  },

  changePromptDescription: function(promptType){

    var $description = this.$el.find("#prompt-description");

      if ( promptType === "Start My Sentences" ) {
        $description.html(
          "Write a story using a random word to start each sentence. " +
          "Typing a period and space will generate a new word."
        );
      }
      else if ( promptType === "reddit" ) {
        $description.html(
          "Write a story using a random writing prompt submitted to /r/writingprompts"
        );
      }
      else if ( promptType === "Classic First Sentence" ) {
        $description.html(
          "Write a story using the first sentence from a classic work."
        );
      }
      else if ( promptType === "Answer What If" ) {
        $description.html(
          "Write a story about what would happen if..."
        );
      }

  },

  renderPrompt: function( e ){
    console.log('rendering');

    var scope = this;

    e.preventDefault();

    scope.storePrompt();
    scope.getPrompt();

    this.$el.find( '#prompt-container' ).html( scope.prompt );
    this.$el.find( '#prompt-container' ).show();
    this.$('.start').show();

  },

  storePrompt: function() {
    app.promptType = $( '#choose-type' ).val();
    app.requiredWords = $( '#post-word-count option:selected' ).data( 'value' );
  },

  getPrompt: function() {

    if (app.promptType === 'Start My Sentences'){
      this.currentPrompt.url = "/api/writing_prompts/one_word"
      this.currentPrompt.fetch({url: this.currentPrompt.url, async:false});
    } else if (app.promptType === 'Answer What If'){
      this.currentPrompt.url = "/api/writing_prompts/what_if"
      this.currentPrompt.fetch({url: this.currentPrompt.url, async:false});
    } else if (app.promptType === 'Classic First Sentence'){
      this.currentPrompt.url = "/api/writing_prompts/first_sentence"
      this.currentPrompt.fetch({url: this.currentPrompt.url, async:false});
    } else if (app.promptType === 'reddit'){
      this.currentPrompt.url = "/api/writing_prompts/reddit"
      var newPrompt = this.currentPrompt.fetch({url: this.currentPrompt.url, async:false}).done(function(){
      });
    } else {
      console.log('no url for this type : ' + app.promptType);
    }

    app.currentPrompt = this.currentPrompt.models[0].get('prompt');

    app.WritingPageController.components.navbar.getPromptInstruction({
      "type": app.promptType,
      "wordCount": app.requiredWords,
      'prompt': app.currentPrompt
    });
  }

});
