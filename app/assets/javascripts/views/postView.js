
var app = app || {};

app.PostView = Backbone.View.extend({
  tagName: 'div',
  className: 'post',
  template: _.template( $('#post-template').html() ),
  normalHeight: '25em',
  openHeight: '40em',


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
      var $deleteButton = $("<span>").addClass("remove-post").html("delete");
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
    'click button.save-critique': 'createCritique',

    'click span.close-critiques': 'renderWithUserName',
    'click span.render-critiques': 'renderCritiques',

    'click label.rating-button': 'saveRating'

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
      var average = this.model.get('avg_rating');
      var userId = this.model.get('user_id');
      var prompt = this.model.get('prompt');

      var id = this.model.get('id');
      var href = "/users/" +  userId + "/posts/" + id;
      var link = $('<a>').attr('href', href).text( this.model.get("title") );
      var lineBreak = $('<br>');

      var wordCount = $('<span>').addClass("post-word-count").html( "    " + this.model.get('word_count') + "  words" );

      var profilePic = this.model.get('image_url');
      var $profilePic = $('<img>').attr("src", profilePic).addClass('post-profile-picture img-circle');

      var promptInstruction = this.getPromptInstruction({
        "type": this.model.get('prompt_type'),
        "wordCount": this.model.get('prompt_word_count'),
        'prompt': this.model.get('prompt')
      });

      this.$("div.post-prompt-type").append(promptInstruction);

      this.$("div#title-holder").append(link, lineBreak, wordCount);
      this.$("strong#created-at").append(createdAt);
      this.$("span#average-rating").append(average);

      this.$el.find('.post-pic-box').append($profilePic);
      this.$("a.post-author").append(username);
      // this.renderCritiqueFormContainer();
      // this.renderEditor();

    },

    getPromptInstruction(options){
      if (options.type === "Use One Word") {
        return "Write " + options.wordCount + " words, using the word <strong>" + options.prompt + "</strong>";
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
    createCritique: function(){
      var newMessage = this.$el.find('textarea#critique-editor').val();
      this.fetchCritiques();
      app.posts.get(this.model.get('id')).critiques.create({message: newMessage});
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

      console.log( 'this post is not rated by this user - Post: ' + this.model.get('id' ));

    }

  },
  // Critique Controller
    fetchCritiques: function(){

      this.innerCollection = new app.CritiquesCollection();
      var urlModel = "/api/posts/" + this.model.get('id') + "/critiques"
      this.innerCollection.url = urlModel;
      this.model.critiques = this.innerCollection;

      this.innerCollection.fetch();

      // Model based render
      // this.model.critiques = new app.CritiquesCollection();
      // this.model.critiques.url = "/api/posts/" + this.model.get('id') + "/critiques";
      // console.log(this.model.critiques.url);
      // this.model.critiques.fetch();
      },
    renderCritiques: function(){
      // this.resizePostDiv( this.openHeight );
      this.fetchCritiques();
      this.innerListView = new app.CritiqueListView({
        collection: this.innerCollection
      });
      var critiqueList = this.$el.find('.critiques-list');
      critiqueList.css({'height': '40em', 'overflow': 'auto'})
      console.log(critiqueList);

      var button = $(this.el).find("span.render-critiques");
      button.removeClass('render-critiques').addClass('close-critiques').html('Hide');

      critiqueList.append(this.innerListView.$el);
    },
    renderCritiqueForm: function(){
      this.$el.empty();
      this.renderWithUserName();
      // this.$el.find('.post-box').css({'height': "15em", "overflow": "auto"});
      var critiqueButton = $(this.el).find('.make-critique');
      critiqueButton.remove();
      this.renderCritiqueFormContainer();
      var postId = parseInt( this.model.get('id') );
      this.fetchCritiques();
      this.renderEditor();
      this.bindCritiqueForm(postId);
      this.renderCritiques();
    },
    renderCritiqueFormContainer: function(){
      var formContainer = $('<div>').addClass('critique-form-container');

      formContainer.html( _.template( $('#critique-form-template').html()) );

      this.$el.find('.make-critique-box').append( formContainer );
    },
    bindCritiqueForm: function(modelId){
      var scope= this;
      $('form#create-critique').on('submit', function(e){
        e.preventDefault();

        // Grab Message from div created by Quill Editor
        var newMessage = scope.$('#critique-editor').first().eq(0).children().eq(0).children().eq(0).html();

        app.posts.get(modelId).critiques.create({message: newMessage});

        scope.renderWithUserName();
        scope.renderCritiques();
        // this.renderCritiques();
      });
    },
    renderEditor: function(){
      // var toolbarClass = '#full-toolbar' + this.model.get('id');
      // var editorClass = '#critique-editor' + this.model.get('id');

      var toolbarPost = this.$el.find('#full-toolbar').eq(0);
      var editorPost = this.$el.find('critique-editor').eq(0);
      console.log(editorPost);
      console.log(toolbarPost);

      var fullEditor = new Quill(editorPost, {
        modules: {
            'toolbar': { container: toolbarPost },
            'link-tooltip': true
        },
        theme: 'snow'
      });
    }

});
