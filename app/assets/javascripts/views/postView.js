
var app = app || {};

app.PostView = Backbone.View.extend({
  tagName: 'div',
  className: 'post',
  template: _.template( $('#post-template').html() ),
  normalHeight: '25em',
  openHeight: '40em',
  critiquePage: 0,

    initialize: function(){
      this.listenTo( this.model, 'change', this.renderWithUserName );
      // var urlModel = "/api/posts/" + this.model.get('id') + "/critiques"
      // this.innerCollection = new app.CritiquesCollection();
      // this.innerCollection.url = urlModel;
      // this.innerCollection.fetch();
    },

    render: function(){
      this.$el.empty();
      var html = this.template( this.model.toJSON() );
      var $html = $( html );
      this.$el.append( $html );

      var poster = this.model.get('username');
      var currentUser = $('#current_user').val()


      var $deleteButton = $("<span>").addClass("remove-post").html("<span class='prompt-label'>delete</span>");
      var $makeCritique = $("<button>").addClass("make-critique btn btn-info").html("Review");
      var $showCritique = $("<span>").addClass("render-critiques").html("Show Critiques");

      this.$el.find(".show-critiques-box").append( $showCritique );


        // this.colorRating();





      // Add delete button for current user critique for other
      if (currentUser === poster) {
        this.$el.find(".remove-post-box").append( $deleteButton );
      } else {

        // If not the user... load the ratings
        // var urlModel = "/api/posts/" + this.model.get("id") + "/ratings"
        //
        // this.ratings = new app.RatingsCollection()
        // this.ratings.url = urlModel;
        // this.ratings.fetch({async: false});
        //
        // if (this.ratings.models.length > 0) {
        //   for (var i = 0; i < this.ratings.models.length; i++) {
        //     var skill = this.ratings.models[i].get("skill");
        //     var value = this.ratings.models[i].get("value");
        //     this.applyRating(value, skill)
        //   }
        // }

      }


    },

// Post Events
  events:{
    'click .remove-post': 'removePost',
    'click .delete-post': 'deletePost',
    'click .make-critique': 'renderCritiqueForm',
    'click .save-critique': 'saveCritique',

    'click .show-feedback': 'showFeedback',
    'click .hide-feedback': 'hideFeedback',


    'click .close-critiques': 'renderWithUserName',
    'click .render-critiques': 'renderCritiques',

    'click label.rating-button': 'saveRating',
    'click span.add-friend': 'addFriend',
    'click .new-rating': 'newRating'



    // Add font size for readability later
    // 'click li.increase-font': 'increaseFont',
    // 'click li.decrease-font': 'decreaseFont'
  },

  newRating: function(e){
    console.log();

    $(e.currentTarget).eq(0).addClass('rated-star');
    var rating = $(e.currentTarget).eq(0).data('value');

    // this.colorStars(rating);

    var post = $(e.currentTarget).eq(0);
    var postId = post.data('post');
    var ratingSkill = post.data('skill');
    var value = post.data('value');


    var urlModel = '/api/posts/' + postId + '/ratings';

    this.ratings = new app.RatingsCollection({url: urlModel});
    this.ratings.url = urlModel;

    this.ratings.create({
      value: value,
      skill: ratingSkill,
      });

    this.applyRating(value, ratingSkill);
  },

    // Remove Post
    removePost: function(){
      var confirmModal = this.$el.find('#deletePost');
      confirmModal.modal('toggle');
    },
    deletePost: function(){
      var confirmModal = this.$el.find('#deletePost');
      confirmModal.modal('toggle');

      this.model.url = "/api/posts/" + this.model.get('id');

      this.model.destroy();
      this.$el.remove();
    },

    // Append UserName to Post Div
    renderWithUserName: function(){
      this.$el.empty();
      this.render();
      var header = $(this.el).find("div.post-author");

      var username = this.model.get('username');

      var createdAt = this.model.get('created_at');


      var userId = this.model.get('user_id');
      var prompt = this.model.get('prompt');

      var writeScore = this.model.get('user_writer_score');
      var reviewScore = this.model.get('user_reviewer_score');

      var writeLabel = $("<span>").addClass("post-author text-center prompt-label").html("Writer Score: " + writeScore );
      var reviewLabel = $("<span>").addClass("post-author text-center prompt-label").html( "Reviewer Score: " + reviewScore );

      var id = this.model.get('id');
      var href = "/users/" +  userId + "/posts/" + id;
      var link = $('<a>').attr('href', href).text( this.model.get("title") );
      var lineBreak = $('<br>');
      var $time = $('<div>').attr('id', 'time_completed');
      var promptType = this.model.get('prompt_type');

      var $wordCount = $('<span>').addClass("post-word-count").html( promptType + " | " + this.model.get('word_count') + "  words | completed in: " + this.getTimeCompleted() );

      var profilePic = this.model.get('image_url');
      var $profilePic = $('<img>').attr("src", profilePic).addClass('post-profile-picture img-circle');

      // Add a Follow button to Posts not User or Following
      var isFriend = this.model.get('is_friend');
      var currentUser = parseInt ( $('#current_id').val() );

      if (isFriend == false && userId !== currentUser ){
        var $addFriend = $('<span>').addClass('add-friend prompt-label').text('Follow');
        // this.$el.find('.post-add-friend').append($addFriend)
      }



      var promptInstruction = this.getPromptInstruction({
        "type": promptType,
        "wordCount": this.model.get('prompt_word_count'),
        'prompt': this.model.get('prompt')
      });

      var $prompt = $('<span>').addClass('post-word-count').html( promptInstruction );


      // this.$("div.post-prompt-type").append(promptInstruction);

      this.$("strong#created-at").html("written " + createdAt + " ago");

      if (this.model.get('avg_rating')){
        var average = "Average Rating: " + this.model.get('avg_rating');
        var $average = $('<span>').addClass("average-rating post-word-count").html( average + "stars" );

      }


      this.$("div#title-holder").append(link, $average, lineBreak, $wordCount, $time, $prompt);


      this.renderFeebackButton();


      var authorLink = "/users/profile/" + this.model.get('user_id');
      var $postAuthor = $('<a>').attr('href', authorLink ).addClass("post-author text-center prompt-label");

      this.$el.find('.post-pic-box').append($profilePic, $postAuthor, lineBreak, $addFriend, writeLabel, reviewLabel);

      this.$("a.post-author").append(username);

      this.hoverHearts();

      this.skills = this.getSkillRatings();
      this.applySkills(this.skills)
      // this.renderCritiqueFormContainer();
      // this.renderEditor();

    },

    getSkillRatings: function(){

      var skills = {
        overall: this.model.get("skill_overall"),
        characters: this.model.get("skill_characters"),
        plot: this.model.get("skill_plot"),
        theme: this.model.get("skill_theme"),
        style: this.model.get("skill_style"),
        grammar: this.model.get("skill_grammar"),
        setting: this.model.get("skill_setting"),
        dialogue: this.model.get("skill_dialogue"),
        structure: this.model.get("skill_structure")
      }

        return skills;

    },

    applySkills: function(skills){

        for (var skill in skills) {
          if (skills.hasOwnProperty(skill)) {

            if (skills[skill] > 0) {
              this.applyRating(skills[skill], skill);
            }

          }
        }
    },

    applyRating: function(rating, skill){

      for (var i = 0; i <= rating; i++) {
        var divId = "#rating-" + skill + "-" + i;
        this.$el.find(divId).find("i").addClass("fa-heart rated");
        this.$el.find(divId).find("i").removeClass( "fa-heart-o" );
      }

      // Add a rated tag to every heart
      for (var i = 0; i <= 5; i++) {
        var divId = "#rating-" + skill + "-" + i;
        this.$el.find(divId).find("i").addClass("rated");
      }

    },


    showFeedback: function(){
      this.$el.empty();
      this.renderWithUserName();
      var $feedback = _.template( $('#critique-post-template').html());


      this.$el.append( $feedback );

      $critique = this.$el.find(".critiques-wrapper");
      $critique.hide();

      // Change Show Button to Hide
      this.renderHideFeeback();

      var postId = parseInt( this.model.get('id') );
      this.fetchCritiques();
      this.renderCritiques();

      $critique.show("slow")
    },

    renderFeebackButton: function(){
      var critiqueButton = this.$el.find('.hide-feedback');

      if(critiqueButton){
        critiqueButton.remove();
      }

      var feedbackNum = this.model.get('feedback_num');
      var feedbackLabel;

      if (feedbackNum > 0){
        feedbackLabel = "<i class='fa fa-comment'><span class='tiny-text'>" + feedbackNum + "</span></i>";
      } else {
        feedbackLabel = "<i class='fa fa-comment'></i>";
      }

      var $feedbackButton = $('<a>').addClass('show-feedback text-left btn btn-raised btn-fab btn-info').html( feedbackLabel );
      this.$el.find('.new-critique-form').append($feedbackButton, "Feedback");
    },

    renderHideFeeback: function(){
      this.$el.find('.new-critique-form').empty();

      var critiqueButton = this.$el.find('.show-feedback');
      critiqueButton.remove();

      var $hide = $('<a>').addClass('hide-feedback text-left prompt-label btn btn-raised btn-fab btn-danger').html( "<i class='fa fa-level-up'></i>" );
      this.$el.find('.new-critique-form').append($hide);

    },

    hideFeedback: function(){
      this.$el.find(".critiques-wrapper").remove();
      this.renderFeebackButton();
    },


    getTimeCompleted: function(){
      var totalSeconds = this.model.get('time_completed');
      var hours = Math.floor(totalSeconds / 3600);
      // totalSeconds %= 3600;
      var minutes = Math.floor(totalSeconds / 60);
      var seconds = totalSeconds % 60;

      // Create Views to Handle :00, :01, etc.
      var minutesView = minutes + ":";
      var hoursView = hours + ":";
      var secondsView = seconds;


      if (minutes < 10){
        minutesView = "0" + minutes + ":";;
      }

      if (seconds < 10){
        secondsView = "0" + seconds;;
      }

      if (hours == 0){
        hoursView = ""
      } else if (hours < 10) {
        hoursView = "0" + hours + ":";
      }

      var $html = hoursView + minutesView + secondsView;

      return $html;
    },

    getPromptInstruction: function(options){
      if (options.type === "Use One Word") {
        return "Write at least " + options.wordCount + " words, using the word <strong>" + options.prompt + "</strong>";
      } else if (options.type === "Answer What If") {
        return "Write at least " + options.wordCount + " words, about what would happen if <strong>" + options.prompt + "</strong>";
      } else if (options.type === "Classic First Sentence") {
        return "Write at least " + options.wordCount + " words, using the first sentence <strong>" + options.prompt + "</strong>";
      } else if (options.type === "reddit"){
        return "Write at least " + options.wordCount + " words, using the reddit writing prompt <strong>" + options.prompt + "</strong>";
      }
    },

    // Manipulate Post CSS
    resizePostDiv: function(height){
      this.$el.css({'height': height});
    },

    closeCritiqueForm: function(){
      this.$el.empty();
      this.renderWithUserName();
      this.resizePostDiv( this.normalHeight );
    },

    saveCritique: function(e){
      e.preventDefault();
      console.log('saving');
      // var newMessage = this.$el.find('textarea#critique-editor').val();
      var newMessage = this.$el.find('.ql-editor').html();

      // In case you need to store the raw text later
      var justWords = this.$el.find('.ql-editor').text();

      var urlModel = '/api/posts/' + this.model.get('id') + '/critiques';
      var critiques = new app.CritiquesCollection();
      critiques.url = urlModel;
      critiques.fetch();

      if (justWords.length > 0){
        console.log(newMessage);
        critiques.create({message: newMessage});
        this.showFeedback();
      }

      this.showFeedback();
    },


    // Rating
    saveRating: function(e){

      $(e.currentTarget).eq(0).addClass('rated-star');
      var rating = $(e.currentTarget).eq(0).data('value');

      this.colorStars(rating);

      var post = $(e.currentTarget).eq(0);
      var postId = post.data('post');
      var currentUser = $('#current_id').val();

      var urlModel = '/api/posts/' + postId + '/ratings';

      var newRating = new app.Rating({url: urlModel});
      newRating.url = urlModel;
      newRating.set('value', rating);

      newRating.save();

    },

    hoverHearts: function(){
      var scope = this;
      this.$el.find( ".new-rating i" ).hover(
        function() {
          var parent = $(this).parent();

          var value = parent.data("value");
          var skill = parent.data("skill");

          if ( $(this).hasClass('rated') ) {
          } else {
            scope.colorHearts(value, skill);
          }

        }, function() {
          var parent = $(this).parent();

          var value = parent.data("value");
          var skill = parent.data("skill");

          if ( $(this).hasClass('rated') ) {
          } else {
            scope.removeColor(value, skill);
          }


        });


    },

    colorHearts: function(rating, skill){

      for (var i = 0; i <= rating; i++) {
        var divId = "#rating-" + skill + "-" + i;

          this.$el.find(divId).find("i").addClass("fa-heart");
          this.$el.find(divId).find("i").removeClass( "fa-heart-o" );

      }
    },

    removeColor: function(rating, skill){

      for (var i = 0; i <= rating; i++) {
        var divId = "#rating-" + skill + "-" + i;

        this.$el.find(divId).find("i").removeClass("fa-heart");
        this.$el.find(divId).find("i").addClass( "fa-heart-o" );


      }
    },


    colorRating: function(){

      if ( this.model.get('is_rated') ){

        var score = this.model.get('rating');
        // this.colorStars(score);

      } else {

      }

    },
  // Critique Controller
    fetchCritiques: function(){

      this.innerCollection = new app.CritiquesCollection();
      var urlModel = "/api/posts/" + this.model.get('id') + "/critiques/page/" + this.critiquePage;
      this.innerCollection.url = urlModel;
      this.model.critiques = this.innerCollection;

      this.innerCollection.fetch();

      },
    renderCritiques: function(){
      this.fetchCritiques();
      this.innerListView = new app.CritiqueListView({
        collection: this.innerCollection,
      });

      this.innerListView.postId = this.model.get('id');


      var critiqueList = this.$el.find('.critiques-list');
      var button = $(this.el).find("span.render-critiques");

      button.removeClass('render-critiques').addClass('close-critiques').html('Hide');

      critiqueList.hide();
      critiqueList.append(this.innerListView.$el);
      critiqueList.show("normal");


      // this.renderCritiqueFormContainer();
      this.renderCritiqueEditor();
    },

    renderCritiqueForm: function(){
      this.$el.empty();
      this.renderWithUserName();

      // this.renderCritiqueFormContainer();
      this.fetchCritiques();

      this.renderCritiques();
    },

    renderCritiqueFormContainer: function(){
      var formContainer = $('<div>').addClass('critique-form-container');

      formContainer.html( _.template( $('#critique-form-template').html()) );

      this.$el.find('.make-critique-box').append( formContainer );

    },

    // bindCritiqueForm: function(modelId){
    //   var scope= this;
    //   console.log('huh');
    //
    //   $('form#create-critique').on('submit', function(e){
    //     e.preventDefault();
    //     console.log('submitting');
    //     // Grab Message from div created by Quill Editor
    //     var newMessage = scope.$('#critique-editor').first().eq(0).children().eq(0).children().eq(0).html();
    //     console.log(newMessage);
    //     app.posts.get(modelId).critiques.create({message: newMessage});
    //
    //     scope.renderWithUserName();
    //     scope.renderCritiques();
    //     scope.$el.find('#critique-editor').empty();
    //   });
    // },

    addFriend: function(){

      this.addedFriend = new app.FriendCollection();
      this.addedFriend.fetch();
      var userId = this.model.get('user_id');

      this.addedFriend.url = "/api/friendships/" + userId;
      var urlModel = "/api/friendships/" + userId
      this.addedFriend.create();

      this.$el.find('.add-friend').remove();

    },

    renderCritiqueEditor: function(){
      // var toolbarClass = '#full-toolbar' + this.model.get('id');
      // var editorClass = '#critique-editor' + this.model.get('id');

      var toolbarPost = this.$el.find('#full-toolbar').eq(0);
      var editorPost = this.$el.find('#critique-editor');

      var editorId = 'critique-editor-' + this.model.get("id");
      var $editor = $("<div>").attr("id", editorId).addClass('critique-editor').hide();
      var editorGrabber = "#" + editorId;

      var toolbarId = 'toolbar-' + this.model.get('id');
      this.$el.find('#full-toolbar').addClass( toolbarId );
      var toolbarGrabber = "." + toolbarId;

      this.$el.find('#critique-editor-holder').append( $editor );


      var fullEditor = new Quill(editorGrabber, {
        modules: {
            'toolbar': { container: toolbarGrabber },
            'link-tooltip': true
        },
        theme: 'snow'
      });

      $editor.show('normal');

    }


});
