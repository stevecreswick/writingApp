
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

    // this.components.promptForm.render();


    //
    // this.bindPromptDescription();
    // this.bindHeadline();
  },

  initializeComponents: function() {
    this.components.promptForm = new app.WritingPagePromptForm({
      el: $('#prompt-form'),
      model: this.Post
    });

    this.components.prompt = new app.WritingPagePrompt({
      el: $( '#prompt-header' ),
      model: this.Post
    });

    this.components.postInfo = new app.WritingPostInfo({
      el: $( '#post-info' ),
      model: this.Post
    });

    this.components.editor = new app.WritingPageEditor({
      el: $( '#post-editor' ),
      model: this.Post
    });
  },
  events:{
    'click a.render-prompt': 'this.components.promptForm.renderPrompt',
    'click a.start': 'renderWritingForm',
    'click a.publish': 'publishPost'
  },

  // getPromptInstruction: function(options){
  //   if (options.type === "Start My Sentences") {
  //     return "Write at least " + options.wordCount + " words.  A Period and Space will give you a random word.";
  //   } else if (options.type === "reddit") {
  //     return "Write at least " + options.wordCount + " words, using the /r/writingprompt";
  //   } else if (options.type === "Classic First Sentence") {
  //     return "Write at least " + options.wordCount + " words, using the classic first sentence";
  //   } else if (options.type === "Answer What If") {
  //     return "Write at least " + options.wordCount + " words, answering what if";
  //   } else {
  //
  //   }
  //
  //   app.requiredWords = options.wordCount;
  // },

  // bindPromptDescription: function(){
  //   var scope = this;
  //   $( "#choose-type" ).change(function() {
  //     scope.changePromptDescription( $('#choose-type').val() );
  //   });
  //
  // },
  //
  // bindHeadline: function(){
  //   var scope = this;
  //   $( "#post-word-count" ).change(function() {
  //     console.log('yo');
  //     var words = $('#post-word-count').val();
  //     console.log(words);
  //     scope.$el.find(".start-writing").html("You are " + words + " away from being a better writer.")
  //     // scope.changePromptDescription( $('#choose-type').val() );
  //   });
  //
  // },

  // changePromptDescription: function(promptType){
  //
  //   var $description = this.$el.find("#prompt-description");
  //
  //   if (promptType === "Start My Sentences") {
  //     $description.html("Write a story using a random word to start each sentence.  Typing a period and space will generate a new word.");
  //   } else if (promptType === "reddit") {
  //     $description.html("Write a story using a random writing prompt submitted to /r/writingprompts");
  //   } else if (promptType === "Classic First Sentence") {
  //     $description.html("Write a story using the first sentence from a classic work.");
  //   } else if (promptType === "Answer What If") {
  //     $description.html("Write a story about what would happen if...");
  //   }
  // },


  updateView: function(){
    this.remove();
    this.render();
  },

  // renderPrompt: function(e){
  //
  //     var scope = this;
  //
  //     e.preventDefault();
  //
  //     app.promptType = $('#choose-type').val();
  //     app.requiredWords = $('#post-word-count option:selected').data('value');
  //
  //     scope.getPrompt();
  //
  //     $('#prompt-instrustion').html(this.promptInstruction);
  //     this.$el.find('#prompt-container').show();
  //
  //     this.$('.start').remove();
  //     var $icon = $('<i>').addClass('fa fa-pencil fa-fw');
  //     var buttonHTML = "&nbsp; Write"
  //     var $start = $('<a>').addClass('btn btn-default btn-raised btn-info start');
  //
  //     $start.append( $icon, buttonHTML);
  //
  //     this.$('#start-writing-container').append( $start );
  //
  //   },

    // getPrompt: function() {
    //
    //   var writingPrompts = new app.WritingPromptCollection();
    //   var promptPainter = new app.WritingPromptListView({
    //     collection: writingPrompts,
    //     el: $('#prompt-container')
    //   });
    //
    //
    //   if (app.promptType === 'Start My Sentences'){
    //     writingPrompts.url = "/api/writing_prompts/one_word"
    //     writingPrompts.fetch({url: writingPrompts.url, async:false});
    //   } else if (app.promptType === 'Answer What If'){
    //     writingPrompts.url = "/api/writing_prompts/what_if"
    //     writingPrompts.fetch({url: writingPrompts.url, async:false});
    //   } else if (app.promptType === 'Classic First Sentence'){
    //     writingPrompts.url = "/api/writing_prompts/first_sentence"
    //     writingPrompts.fetch({url: writingPrompts.url, async:false});
    //   } else if (app.promptType === 'reddit'){
    //     writingPrompts.url = "/api/writing_prompts/reddit"
    //     var newPrompt = writingPrompts.fetch({url: writingPrompts.url, async:false}).done(function(){
    //     });
    //   } else {
    //     console.log('no url for this type : ' + app.promptType);
    //   }
    //
    //   this.prompt = writingPrompts.models[0].get('prompt');
    //   this.type = app.promptType;
    //
    //   this.promptInstruction = this.getPromptInstruction({
    //     "type": this.type,
    //     "wordCount": app.requiredWords,
    //     'prompt': this.prompt
    //   });
    //
    //
    // },

    // renderWritingForm: function(e){
    //
    //   app.pagePainter.renderWritingNav();
    //
    //   // Resize the columns
    //   app.pagePainter.columns("main");
    //
    //   // Render Writing Nav
    //   $('#left-pane').children().remove();
    //   app.pagePainter.renderWritingSidebar();
    //
    //   // Render Writing Form From Template
    //   e.preventDefault();
    //   this.$el.empty();
    //   var template = _.template( $('#create-post-template').html() );
    //   var html = template();
    //   var $html = $( html );
    //   this.$el.append( $html );
    //
    //   // Get all the prompt info
    //   // this.createPrompt();
    //
    //   // Add Prompt Instruction
    //   this.promptInstruction;
    //   $('#prompt-instrustion').html(this.promptInstruction);
    //   $("#prompt").html( this.prompt );
    //   // $('#required-word-count').html( app.requiredWords )
    //
    //   // Render Text Editor & Bind To Word Count
    //   this.renderEditor();
    //   this.listenToForm();
    //
    //   $('.ql-editor').children().last().html( this.prompt.charAt(0).toUpperCase() + this.prompt.slice(1) + " ");
    //
    //
    //   // Start the Timer
    //   this.startClock();
    //
    //   // Put in the starting word count
    //   $('#current-word-count').eq(0).html( app.wordCount + "/" + app.requiredWords );
    //
    // },

//
//     startClock: function(){
//
//       if (app.timer){
//         this.clearTime();
//       }
//
//       var $stopwatch = this.$el.find('#stopwatch');
//
//       app.totalTime = 0;
//       app.seconds = 0;
//       app.minutes = 0;
//       app.hours = 0;
//
//       app.timer = setInterval(this.renderTime, 1000);
//       $('#stopwatch').show();
//
//     },
//
//     wordsPerMinute: function(){
//       var minutes = app.totalTime / 60;
//
//       var wpm = Math.floor( app.wordCount / minutes );
//
//       $("#current-wpm-count").html(wpm)
//     },
//
//     renderTime: function(){
//       app.totalTime++;
//       app.hours = Math.floor(app.totalTime / 3600);
//       // totalSeconds %= 3600;
//       app.minutes = Math.floor(app.totalTime / 60);
//       app.seconds = app.totalTime % 60;
//
// // WPM
//       var minutes = app.totalTime / 60;
//
//       var wpm = Math.floor( parseInt(app.wordCount) / minutes );
//
//       $("#current-wpm-count").html(wpm)
//
//       // Create Views to Handle :00, :01, etc.
//       var minutesView = app.minutes + ":";
//       var hoursView = app.hours + ":";
//       var secondsView = app.seconds;
//
//
//       if (app.minutes < 10){
//         minutesView = "0" + app.minutes + ":";;
//       }
//
//       if (app.seconds < 10){
//         secondsView = "0" + app.seconds;;
//       }
//
//       if (app.hours == 0){
//         hoursView = ""
//       } else if (app.hours < 10) {
//         hoursView = "0" + app.hours + ":";
//       }
//
//       $('#stopwatch').html(hoursView + minutesView + secondsView);
//
//
//     },
//
//
//
//     clearTime: function(){
//       clearInterval(app.timer);
//       app.timer = null;
//       app.totalTime = 0;
//       app.seconds = 0;
//       app.minutes = 0;
//       app.hours = 0;
//       console.log('stopped seconds: ' +  app.seconds);
//     },
//
//     publishPost: function(){
//
//       console.log('publishing');
//         var newMessage = $('#post-editor').first().eq(0).children().eq(0).html();
//         var newTitle = $('#post-title').val();
//         var genre = $('#choose-genre').val();
//         var prompt = $('#prompt').text();
//
//         // Find Word Count
//         var messageText = $('#post-editor').find('.ql-editor').text();
//         var messageLength = messageText.match(/\S+/g).length;
//
//         // Check Title / Word Count
//         if (newTitle === ""){
//           console.log('yo');
//           $('.post-error').html('Error: A title is required.');
//           // $('#post-title').css('border', '1px solid red');
//
//         } else if (messageLength >= app.requiredWords) {
//           var $stopwatch = $('#stopwatch');
//
//           // Store the seconds in the post
//
//           console.log(this.newPrompt);
//           // Create a Post
//           app.posts.create({
//
//             title: newTitle,
//             genre: genre,
//             message: newMessage,
//             word_count: messageLength,
//             time_completed: app.totalTime,
//
//             prompt: this.prompt,
//             prompt_word_count: app.requiredWords,
//             prompt_type: this.type,
//             // model_url: this.newPrompt.url,
//
//             },
//
//             {
//             url: '/api/posts',
//             wait:true,
//             async: false
//           });
//
//           app.pagePainter.renderMain();
//           // this.render();
//           this.$el.css({'height': 'auto'});
//
//         } else {
//           this.$('.post-error').text('Error: Post does not meet required word count.');
//         }
//
//     },
//
//     updateWordCountStatus: function(wordCount){
//
//         var progress = Math.floor( (wordCount / app.requiredWords) * 100 ) + "%";
//         console.log(progress);
//         this.$el.find('.progress-bar').css({"width": progress});
//     },
//
//     listenToForm: function(){
//       app.wordCount = 0;
//       var scope = this;
//
//       $('#post-editor').on('keyup', function(e){
//
//         var text = scope.$el.find('#post-editor').find('.ql-editor').text();
//         app.wordCount = text.match(/\S+/g).length;
//         $('#current-word-count').eq(0).html( app.wordCount + "/" + app.requiredWords );
//
//         scope.updateWordCountStatus(app.wordCount);
//
//         if (app.promptType === "Start My Sentences"){
//           scope.addWord(e);
//         }
//
//       });
//
//
//     },
//
//     addWord: function(e){
//       var periodKey = 190;
//       var spaceKey = 32;
//
//       app.currentKey = e.keyCode;
//
//       if ( app.currentKey === spaceKey && app.lastKey === periodKey )   {
//         console.log("period then space");
//
//         var currentPost = $('#post-editor').find('.ql-editor').html();
//
//         this.nextWord = new app.WritingPromptCollection();
//         this.nextWord.url = "/api/writing_prompts/one_word";
//         this.nextWord.fetch({url: this.nextWord.url, async:false});
//
//         var nextWord = this.nextWord.models[0].get('prompt');
//
//         var startWith = nextWord.charAt(0).toUpperCase() + nextWord.slice(1);
//         var newWord = $('.ql-editor').children().last();
//
//         $(newWord).append(startWith + " ");
//
//         this.setCaret();
//
//       }
//
//       app.lastKey = e.keyCode;
//
//
//     },
//
//     setCaret: function() {
//     var el = $('#post-editor').find('.ql-editor');
//     var range = document.createRange();
//     console.log(range);
//     var sel = window.getSelection();
//     console.log(sel);
//     var node = el.children().last();
//
//     console.log(node[0]);
//     console.log($(node).length);
//
//     range.setStart(node[0], $(node).length + 1 );
//     range.collapse(true);
//     sel.removeAllRanges();
//     sel.addRange(range);
//     el.focus();
//   },
//     //
//     // startMySentences(lastKey){
//     //   var scope = this;
//     //   $('#post-editor').on('keyup', function(){
//     //
//     //
//     //
//     //     var text = scope.$el.find('#post-editor').find('.ql-editor').text();
//     //     app.wordCount = text.match(/\S+/g).length;
//     //     $('#current-word-count').eq(0).html( app.wordCount + "/" + app.requiredWords );
//     //     scope.updateWordCountStatus(app.wordCount);
//     //
//     //   });
//     //   console.log("new word");
//     //
//     // },
//
//     renderEditor: function(){
//       var fullEditor = new Quill('#post-editor', {
//         modules: {
//             'toolbar': { container: '#post-toolbar' },
//             'link-tooltip': true,
//         },
//         theme: 'snow'
//       });
//     }

});
