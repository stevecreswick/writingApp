console.log('post view');

var app = app || {};

app.PostView = Backbone.View.extend({
  tagName: 'div',
  className: 'post',
  template: _.template( $('#post-template').html() ),
  initialize: function(){
    this.listenTo( this.model, 'change', this.renderWithUserName );
    var urlModel = "/api/posts/" + this.model.get('id') + "/critiques"
    this.innerCollection = new app.CritiquesCollection();
    this.innerCollection.url = urlModel;
    this.innerCollection.fetch();
  },

  render: function(){
    this.$el.empty();
    var html = this.template( this.model.toJSON() );
    var $html = $( html );

    this.innerListView = new app.CritiqueListView({
      collection: this.innerCollection
    });
    this.$el.append( $html );
    this.$el.append(this.innerListView.$el);
  },

  events:{
    'click button.remove': 'removePost',
    'click button.make-critique': 'makeCritique',
    'click button.close-critique': 'closeCritique'
  },

    getUserName: function(){
      var username = this.model.get('username');
      return username;
    },
    renderWithUserName: function(){
      this.$el.empty();
      this.render();
      var header = $(this.el).find("h3");
      var username = this.getUserName();
      // username undefined when the post is first created
      this.$("h3.post-header").html(username);
    },


  // Critique Controller

    getCritiques: function(){
      this.model.critiques = new CritiquesCollection();
      this.model.critiques.url = "/api/posts/" + this.model.get('id') + "/critiques";
      this.model.critiques.fetch({async:false});
      },
    showCritiques: function(){

    },
    closeCritique: function(){
      this.$el.empty();
      this.$el.css({'height': '30em'});
      this.renderWithUserName();
    },


  removePost: function(){
    this.model.destroy();
    this.$el.remove();
  },

  makeCritique: function(){
    console.log('click');
    // var html = this.template( this.model.toJSON() );
    this.$el.empty();
    this.$el.css({'height': '40em'});
    this.renderWithUserName();
    var critiqueSpace = $(this.el).find(".critique-space");
    var critiqueButton = $(this.el).find('.make-critique');
    critiqueButton.remove();
    critiqueSpace.css({'height': '10em'})
    critiqueSpace.html( _.template( $('#critique-form-template').html()) );
    var postId = parseInt( this.model.get('id') );
    console.log('passing into bind critique ' + postId);
    this.getCritiques();
    this.bindCritiqueSubmit(postId);
  },
  bindCritiqueSubmit: function(modelId){
    $('form#create-critique').on('submit', function(e){
      e.preventDefault();
      console.log(modelId);

      // PASSES THROUGH MODEL ID AND MESSAGE!!!!
      var newMessage = $(this).find("#critique-message").val();
      app.posts.get(modelId).critiques.create({message: newMessage});

    });
  },

  checkMessage: function(){
    console.log(this.model.get('message'));
  }

});
