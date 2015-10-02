console.log('...app.js loaded')

var token = $('#api-token').val();
$.ajaxSetup({
  headers:{
    "accept": "application/json",
    "token": token
  }
});

// Places call to critique API at the Posts


var Critique = Backbone.Model.extend({});

var CritiquesCollection = Backbone.Collection.extend({
  model: Critique
});

var CritiqueView = Backbone.View.extend({
  tagName: 'div',
  className: 'critique-view',
  template: _.template( $('#critique-template').html() ),
  initialize: function(){
    this.listenTo( this.model, 'change', this.render );
  },
  render: function(){
    this.$el.empty();
    var html = this.template( this.model.toJSON() );
    var $html = $( html );
    this.$el.append( $html );
  },
  events:{
    // Add a DELETE EVENT
  }
});

var CritiqueListView = Backbone.View.extend({
  initialize: function() {
    this.listenTo(this.collection, 'add', this.render);
  },
  render: function(){
    this.$el.empty();
      var critiques = this.collection.models;
      var view;
        for (var i = 0; i < critiques.length; i++) {
          view = new CritiqueView({model: critiques[i]});
          view.render();
          this.$el.append( view.$el );
        }
    }
});

// Posts
var Post = Backbone.Model.extend({});

var PostCollection = Backbone.Collection.extend({
  model: Post,
  url: '/api/posts'
});


var PostView = Backbone.View.extend({
  tagName: 'div',
  className: 'post',
  template: _.template( $('#post-template').html() ),
  initialize: function(){
    this.listenTo( this.model, 'change', this.renderWithUserName );
    var urlModel = "/api/posts/" + this.model.get('id') + "/critiques"
    this.innerCollection = new CritiquesCollection();
    this.innerCollection.url = urlModel;
    this.innerCollection.fetch();
  },
  render: function(){
    this.$el.empty();
    var html = this.template( this.model.toJSON() );
    var $html = $( html );

    this.innerListView = new CritiqueListView({
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
      posts.get(modelId).critiques.create({message: newMessage});

    });
  },

  checkMessage: function(){
    console.log(this.model.get('message'));
  }

});

var PostListView = Backbone.View.extend({
  initialize: function(){
    this.listenTo(this.collection, 'add', this.render);
  },
  render: function(){
    this.$el.empty();

      var posts = this.collection.models;
      var view;
        for (var i = 0; i < posts.length; i++) {
          view = new PostView({model: posts[i]});

          //Appends the Username to each Div
          view.renderWithUserName();
          this.$el.append( view.$el );
        }
    }
});



//Declarations

var posts = new PostCollection();
var postPainter = new PostListView({
  collection: posts,
  el: $('#post-list')
});

posts.fetch();


//On Load

$( document ).ready(function() {

  $('form#create-post').on('submit', function(e){
    e.preventDefault();
    var newMessage = $(this).find("#post-body").val();
    posts.create({message: newMessage},{wait:true});
  });

});
