
var app = app || {};

app.PostView = Backbone.View.extend({
  tagName: 'div',
  className: 'post',
  template: _.template( $('#post-template').html() ),

  initialize: function(){
    this.listenTo( this.model, 'change', this.renderWithUserName );
  },

  render: function(){
    this.$el.empty();
    var html = this.template( this.model.toJSON() );
    console.log(this.model);
    var $html = $( html );
    this.$el.append( $html );
    // var poster = this.model.get('username'),
    //     currentUser = $('#current_user').val(),
    //     $deleteButton = $("<a>").addClass("remove-post btn btn-raised btn-fab btn-danger").html("<i class='fa fa-trash'></i>"),
    //     $makeCritique = $("<button>").addClass("make-critique btn btn-info").html("Review"),
    //     $showCritique = $("<span>").addClass("render-critiques").html("Show Critiques");

    // this.$el.find(".show-critiques-box").append( $showCritique );

    // Add delete button for current user critique for other
    // if (currentUser === poster) {
    //   this.$el.find(".remove-post-box").append( $deleteButton, "delete post" );
    // } else {

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

      // }

    },

    // addIcon: function(genre){
    //   var postIcon = new app.GenreIcon( genre );
    //   this.$el.find( 'img.genre-icon-img' ).attr( 'src', postIcon.url() );
    // },

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

  },

    // Remove Post
    // removePost: function(){
    //   var confirmModal = this.$el.find('#deletePost');
    //   confirmModal.modal('toggle');
    // },
    // deletePost: function(){
    //   var confirmModal = this.$el.find('#deletePost');
    //   confirmModal.modal('toggle');
    //
    //   this.model.url = "/api/posts/" + this.model.get('id');
    //
    //   this.model.destroy();
    //   this.$el.remove();
    // },

    // Append UserName to Post Div
    // renderWithUserName: function(){
    //   this.$el.empty();
    //   this.render();
    //   var header = $(this.el).find("div.post-author");
    //
    //   var username = this.model.get('username');
    //
    //   var createdAt = this.model.get('created_at');
    //
    //
    //   var userId = this.model.get('user_id');
    //   var prompt = this.model.get('prompt');

      // var writeScore = this.model.get('user_writer_score');
      // var reviewScore = this.model.get('user_reviewer_score');

      // var writeLabel = $("<span>").addClass("post-author text-center prompt-label").html("Writer Score: " + writeScore );
      // var reviewLabel = $("<span>").addClass("post-author text-center prompt-label").html( "Reviewer Score: " + reviewScore );

      // var id = this.model.get('id');
      // var href = "/users/" +  userId + "/posts/" + id;
      // var link = $('<a>').attr('href', href).text( this.model.get("title") );
      // var lineBreak = $('<br>');
      // var $time = $('<div>').attr('id', 'time_completed');
      // var promptType = this.model.get('prompt_type');

      // var $wordCount = $('<span>').addClass("post-word-count").html( promptType + " | " + this.model.get('word_count') + "  words | completed in: " + this.getTimeCompleted() );

      // var profilePic = this.model.get('image_url');
      // var $profilePic = $('<img>').attr("src", profilePic).addClass('post-profile-picture img-circle');

      // Add a Follow button to Posts not User or Following
      // var isFriend = this.model.get('is_friend');
      // var currentUser = parseInt ( $('#current_id').val() );
      //
      // if (isFriend == false && userId !== currentUser ){
      //   var $addFriend = $('<span>').addClass('add-friend prompt-label').text('Follow');
        // this.$el.find('.post-add-friend').append($addFriend)
      // }

      // var genrePic = 'http://i.imgur.com/BI8PegK.png';
      // var $genrePic = $('<img>').attr("src", genrePic).addClass('genre-icon-img');
      //
      // this.$el.find(".genre-icon").append( $genrePic );
      //
      // var promptInstruction = this.getPromptInstruction({
      //   "type": promptType,
      //   "wordCount": this.model.get('prompt_word_count'),
      //   'prompt': this.model.get('prompt')
      // });
      //
      // var $prompt = $('<span>').addClass('post-word-count').html( promptInstruction );


      // this.$("div.post-prompt-type").append(promptInstruction);

      // this.$("strong#created-at").html("written " + createdAt + " ago");
      //
      // if (this.model.get('avg_rating')){
      //   var average = "Average Rating: " + this.model.get('avg_rating');
      //   var $average = $('<span>').addClass("average-rating post-word-count").html( average + "stars" );
      //
      // }


      // this.$el.find("div#post-prompt").append($prompt);
      //
      //
      // this.renderFeebackButton();
      //
      // var authorLink = "/users/profile/" + this.model.get('user_id');
      // var $postAuthor = $('<a>').attr('href', authorLink ).addClass("post-author text-center prompt-label");
      //
      // this.$el.find('.post-pic-box').append($profilePic, $postAuthor, lineBreak, $addFriend);
      //
      // this.$("a.post-author").append(username);
      //
      // this.$el.find("#time-completed").html( "Completed In: " + this.getTimeCompleted() );
      // this.hoverHearts();

      // this.skills = this.getSkillRatings();
      // this.applySkills(this.skills)
      // this.addIcon( this.model.get('genre') );
      // this.showRating();


      // this.renderCritiqueFormContainer();
      // this.renderEditor();

    // },

    // showFeedback: function(){
    //   this.$el.empty();
    //   this.renderWithUserName();
    //   var $feedback = _.template( $('#critique-post-template').html());
    //
    //
    //   this.$el.append( $feedback );
    //
    //   $critique = this.$el.find(".critiques-wrapper");
    //   $critique.hide();

      // Change Show Button to Hide
    //   this.renderHideFeeback();
    //
    //   var postId = parseInt( this.model.get('id') );
    //   this.fetchCritiques();
    //   this.renderCritiques();
    //
    //   $critique.show("slow")
    // },

    // renderFeebackButton: function(){
    //   var critiqueButton = this.$el.find('.hide-feedback');
    //
    //   if(critiqueButton){
    //     critiqueButton.remove();
    //   }
    //
    //   var feedbackNum = this.model.get('feedback_num');
    //   var feedbackLabel;
    //
    //   if (feedbackNum > 0){
    //     feedbackLabel = "<i class='fa fa-comment'><span class='tiny-text'>" + feedbackNum + "</span></i>";
    //   } else {
    //     feedbackLabel = "<i class='fa fa-comment'></i>";
    //   }
    //
    //   var $feedbackButton = $('<a>').addClass('show-feedback text-left btn btn-raised btn-fab btn-info').html( feedbackLabel );
    //   this.$el.find('.new-critique-form').append($feedbackButton, "Feedback");
    // },

    // renderHideFeeback: function(){
    //   this.$el.find('.new-critique-form').empty();
    //
    //   var critiqueButton = this.$el.find('.show-feedback');
    //   critiqueButton.remove();
    //
    //   var $hide = $('<a>').addClass('hide-feedback text-left prompt-label btn btn-raised btn-fab btn-danger').html( "<i class='fa fa-level-up'></i>" );
    //   this.$el.find('.new-critique-form').append($hide);
    //
    // },

    // hideFeedback: function(){
    //   var scope = this;
    //   this.$el.find(".critiques-wrapper").hide('slow', function(){ scope.$el.find(".critiques-wrapper").remove(); });
    //   this.renderFeebackButton();
    // },


    // getPromptInstruction: function(options){
    //   if (options.type === "Use One Word") {
    //     return "Write at least " + options.wordCount + " words, using the word <div class='prompt-strong'>" + options.prompt + "</div>";
    //   } else if (options.type === "Answer What If") {
    //     return "Write at least " + options.wordCount + " words, about what would happen if <div class='prompt-strong'>" + options.prompt + "</div>";
    //   } else if (options.type === "Classic First Sentence") {
    //     return "Write at least " + options.wordCount + " words, using the first sentence <div class='prompt-strong'>" + options.prompt + "</div>";
    //   } else if (options.type === "reddit"){
    //     return "Write at least " + options.wordCount + " words, using the reddit writing prompt <div class='prompt-strong'>" + options.prompt + "</div>";
    //   }
    // },

    // Seperate into a friend button that accepts a user id
    // addFriend: function(){
    //
    //   this.addedFriend = new app.FriendCollection();
    //   this.addedFriend.fetch();
    //   var userId = this.model.get('user_id');
    //
    //   this.addedFriend.url = "/api/friendships/" + userId;
    //   var urlModel = "/api/friendships/" + userId
    //   this.addedFriend.create();
    //
    //   this.$el.find('.add-friend').remove();
    //
    // },

    // Create a Timer View
        // getTimeCompleted: function(){
        //   var totalSeconds = this.model.get('time_completed');
        //   var hours = Math.floor(totalSeconds / 3600);
        //   var minutes = Math.floor(totalSeconds / 60);
        //   var seconds = totalSeconds % 60;
        //
        //   var minutesView = minutes + ":";
        //   var hoursView = hours + ":";
        //   var secondsView = seconds;
        //
        //
        //   if (minutes < 10){
        //     minutesView = "0" + minutes + ":";;
        //   }
        //
        //   if (seconds < 10){
        //     secondsView = "0" + seconds;;
        //   }
        //
        //   if (hours == 0){
        //     hoursView = ""
        //   } else if (hours < 10) {
        //     hoursView = "0" + hours + ":";
        //   }
        //
        //   var $html = hoursView + minutesView + secondsView;
        //
        //   return $html;
        // },




});
