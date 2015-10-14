
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
    },

// Post Events
  events:{
    'click button.remove-post': 'removePost',
    'click button.make-critique': 'renderCritiqueForm',
    'click button.close-critique': 'closeCritiqueForm',
    'click button.render-critiques': 'renderCritiques'
  },

    // Remove Post
    removePost: function(){
      this.model.destroy();
      this.$el.remove();
    },

    // Append UserName to Post Div
    renderWithUserName: function(){
      this.$el.empty();
      this.render();
      var header = $(this.el).find("div.post-author");
      var username = this.model.get('username');
      this.$("div.post-author").html("Author: " + username);
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
      this.resizePostDiv( this.openHeight );
      this.fetchCritiques();
      // Fetch critiques not working?

      console.log(this.innerCollection);
      this.innerListView = new app.CritiqueListView({
        collection: this.innerCollection
      });
      this.$el.append(this.innerListView.$el);
    },
    renderCritiqueForm: function(){
      this.$el.empty();
      this.resizePostDiv( this.openHeight );
      this.renderWithUserName();
      var critiqueButton = $(this.el).find('.make-critique');
      critiqueButton.remove();
      this.renderCritiqueFormContainer();
      var postId = parseInt( this.model.get('id') );
      this.fetchCritiques();

      this.renderEditor();
      this.bindCritiqueForm(postId);

    },
    renderCritiqueFormContainer: function(){
      var formContainer = $('<div>').addClass('critique-form-container');

      formContainer.html( _.template( $('#critique-form-template').html()) );

      this.$el.append( formContainer );
    },
    bindCritiqueForm: function(modelId){
      var scope= this;
      $('form#create-critique').on('submit', function(e){
        e.preventDefault();

        var newMessage = scope.$('#critique-editor').first().eq(0).html();

        app.posts.get(modelId).critiques.create({message: newMessage});
      });
    },
    renderEditor: function(){
      var fullEditor = new Quill('#critique-editor', {
        modules: {
            'toolbar': { container: '#full-toolbar' },
            'link-tooltip': true
        },
        theme: 'snow'
      });
    }

});