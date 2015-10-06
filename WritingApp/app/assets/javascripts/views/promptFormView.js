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
      $('body').keyup(this.goBack);
      var newPrompt = this.createPrompt();
      console.log(newPrompt);
      this.$el.empty();
      var template = _.template( $('#create-post-template').html() );
      var html = template();
      var $html = $( html );
      this.$el.append( $html );
      this.$("h5#post-box-prompt").html(newPrompt.prompt);
      this.$("h4#post-box-word-count").html(newPrompt.wordCount);

    },
    createPrompt: function(){
      var newPrompt = {
        prompt:  $('.prompt-text').text(),
        wordCount: $('#post-word-count').val()
      }
      return newPrompt;
    },
    goBack: function(e){
      console.log (e.type, e.keyCode);
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
