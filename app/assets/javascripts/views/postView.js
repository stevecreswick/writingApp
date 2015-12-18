
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

      this.colorRating();

      // Add delete button for current user critique for other
      if (currentUser === poster) {
        this.$el.find(".remove-post-box").append( $deleteButton );
      } else {
        // this.$el.find(".remove-post-box").append( $makeCritique );

      }


    },

// Post Events
  events:{
    'click span.remove-post': 'removePost',
    'click button.delete-post': 'deletePost',
    'click button.make-critique': 'renderCritiqueForm',
    'click button.save-critique': 'saveCritique',

    'click .show-feedback': 'showFeedback',
    'click .hide-feedback': 'hideFeedback',


    'click span.close-critiques': 'renderWithUserName',
    'click span.render-critiques': 'renderCritiques',

    'click label.rating-button': 'saveRating',
    'click span.add-friend': 'addFriend'


    // Add font size for readability later
    // 'click li.increase-font': 'increaseFont',
    // 'click li.decrease-font': 'decreaseFont'
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



      // this.renderCritiqueFormContainer();
      // this.renderEditor();

    },

    showFeedback: function(){
      this.$el.empty();
      this.renderWithUserName();
      var $feedback = _.template( $('#critique-post-template').html());
      this.$el.append( $feedback );

      // Change Show Button to Hide
      this.renderHideFeeback();

      var postId = parseInt( this.model.get('id') );
      this.fetchCritiques();
      this.renderCritiques();


    },

    renderFeebackButton: function(){
      var critiqueButton = this.$el.find('.hide-feedback');

      if(critiqueButton){
        critiqueButton.remove();
      }

      var feedbackNum = this.model.get('feedback_num');
      var feedbackLabel;

      if (feedbackNum > 0){
        feedbackLabel = "Give Feedback (" + feedbackNum + ")";
      } else {
        feedbackLabel = "Give Feedback";
      }

      var $feedbackButton = $('<h5>').addClass('show-feedback text-left prompt-label').html( feedbackLabel );
      this.$el.find('.new-critique-form').append($feedbackButton);
    },

    renderHideFeeback: function(){
      var critiqueButton = this.$el.find('.show-feedback');
      critiqueButton.remove();

      var $hide = $('<h5>').addClass('hide-feedback text-left prompt-label').html( "Hide" );
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

    saveCritique: function(){
      var newMessage = this.$el.find('textarea#critique-editor').val();
      this.$el.find('textarea#critique-editor').val('');

      var urlModel = '/api/posts/' + this.model.get('id') + '/critiques';
      var critiques = new app.CritiquesCollection();
      critiques.url = urlModel;
      critiques.fetch();

      if (newMessage.length > 0){
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

    colorStars: function(rating){
      for (var i = 1; i <= rating; i++) {
        var divId = "#label-star" + i;
        var addStar = this.$el.find(divId).eq(0);
        addStar.addClass('rated-star')
      }
    },

    colorRating: function(){

      if ( this.model.get('is_rated') ){

        var score = this.model.get('rating');
        this.colorStars(score);

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

      critiqueList.append(this.innerListView.$el);
    },

    renderCritiqueForm: function(){
      this.$el.empty();
      this.renderWithUserName();

      this.renderCritiqueFormContainer();
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

    renderEditor: function(){
      // var toolbarClass = '#full-toolbar' + this.model.get('id');
      // var editorClass = '#critique-editor' + this.model.get('id');

      var toolbarPost = this.$el.find('#full-toolbar').eq(0);
      var editorPost = this.$el.find('critique-editor').eq(0);

      var fullEditor = new Quill(editorPost, {
        modules: {
            'toolbar': { container: toolbarPost },
            'link-tooltip': true
        },
        theme: 'snow'
      });
    }

});
