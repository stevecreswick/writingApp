var app = app || {};

app.promptFormView = Backbone.View.extend({
  tagName: 'div',
  className: 'prompt-form',
  template: _.template( $('#prompt-form-template').html() ),
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
    'keyup': 'checkCharacterCount'
  },
  getPrompt: function(){
      console.log('prompt render');

      var writingPrompts = new app.WritingPromptCollection();

      var promptPainter = new app.WritingPromptListView({
        collection: writingPrompts,
        el: $('#prompt-container')
      });

      writingPrompts.fetch();
    },
    renderWritingForm: function(){
      var newPrompt = this.createPrompt();
      this.$el.empty();
      var template = _.template( $('#create-post-template').html() );
      var html = template();
      var $html = $( html );
      this.$el.append( $html );
      this.$("h5#post-box-prompt").html(newPrompt.prompt);
      this.$("h4#post-box-word-count").html(newPrompt.wordCount);
      this.bindWritingFormSubmit(newPrompt.prompt, newPrompt.wordCount, newPrompt.type);
    },
    bindWritingFormSubmit: function(prompt, wordCount, type){
      console.log(prompt + " " + wordCount + " " + type);
      $('form#create-post').on('submit', function(e){
        e.preventDefault();
        var newMessage = $(this).find("#post-body").val();
        app.posts.create({message: newMessage, prompt: prompt, word_count: wordCount, prompt_type: type},{wait:true});
      });
    },
    createPrompt: function(){
      var newPrompt = {
        prompt:  $('.prompt-text').text(),
        wordCount: $('#post-word-count').val(),
        type: $('#choose-type').val()
      }
      return newPrompt;
    },
    checkCharacterCount: function(){
      this.characters = $('textarea#post-body').val().length;
      $('.character-count').html( this.characters );
    },
    bindSlider: function(){
      $( "#slider-word-count" ).slider({
           range: "min",
           min: 50,
           max: 500,
           step: 50,
           slide: function( event, ui ) {
                $( "#word-count" ).html( ui.value );
                $("#post-word-count").val(ui.value);
           }
      });
    },
    stopWatch: function(){

    }
});
