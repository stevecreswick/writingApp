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
