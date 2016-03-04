
var app = app || {};

app.requiredWords = 0;
app.prompt = "";
app.promptType = "";
app.wordCount = 0;


app.WritingPage = Backbone.View.extend({
  tagName: 'div',
  className: 'writing-page-container',
  template: _.template( $('#writing-page-template').html() ),
  minWords: null,
  totalTime: 0,
  seconds: 0,
  minutes: 0,
  hours: 0,
  newPrompt: {},
  components: {},

  initialize: function(){

    this.Post = new app.Post();

  },

  render: function(){
    this.$el.empty();
    this.$el.append( $( this.template() ) );

    this.initializeComponents();

    // this.components.promptForm.render();

  },

  initializeComponents: function() {

    this.components.promptForm = new app.WritingPagePromptForm({
      el: $('#prompt-form'),
      model: this.Post
    });

    this.components.navbar = new app.WritingPageNavbar({
      el: $( '#writing-navbar' ),
      model: this.Post
    });

    this.components.editor = new app.WritingPageEditor({
      el: $( '#writing-page-main' ),
      model: this.Post
    });

  },

  events:{
  }

});
