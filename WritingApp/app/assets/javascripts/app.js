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



// Model
var Post = Backbone.Model.extend({
  initialize: function(){
    // console.log(this.id);
  }
});


// Collection
var PostCollection = Backbone.Collection.extend({
  model: Post,
  url: '/api/posts'
});




// Views
var PostView = Backbone.View.extend({
  tagName: 'div',
  className: 'post',
  template: _.template( $('#post-template').html() ),
  initialize: function(){
    this.listenTo( this.model, 'change', this.renderWithUserName );
  },

  render: function(){
    this.$el.empty();

    var html = this.template( this.model.toJSON() );
    var $html = $( html );
    // console.log(this.model.get('id') + " " + this.getUserName());
    this.$el.append( $html );
  },
  events:{
    'click button.remove': 'removePost',
    'click button.make-critique': 'makeCritique'
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

  getCritiques: function(){
    // console.log('***** get critiques *****')
    // console.log(this.model.get('message'));
    this.model.critiques = new CritiquesCollection();
    this.model.critiques.url = "/api/posts/" + this.model.get('id') + "/critiques";
    this.model.critiques.fetch({async:false});
    console.log('creating critique for ' + this.model.get('id'));
    // APPENDS THE MESSAGE OF THE CRITIQUE TO THE DIV
      // for (var i = 0; i < this.model.critiques.models.length; i++) {
      //   var critique = this.model.critiques.models[i]
      //   console.log(critique);
      //   $html.append(critique.get('message'));
      // }
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
    critiqueSpace.html( _.template( $('#critique-template').html()) );

    var postId = this.model.get('id');

    this.getCritiques();

    this.bindCritiqueSubmit(postId);
  },
  bindCritiqueSubmit: function(modelId){

    $('form#create-critique').on('submit', function(e){
      e.preventDefault();

      // PASSES THROUGH MODEL ID AND MESSAGE!!!!
      var newMessage = $(this).find("#critique-message").val();

      console.log('critiquing post ' + modelId);
      console.log('newMessage ' + newMessage);

      console.log(  posts.get(modelId) );
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

var testPost = new Post({message: 'this is TestPost for testing'})
var testPostView = new PostView({model: testPost, id: 999});


//On Load

$( document ).ready(function() {


  $('form#create-post').on('submit', function(e){
    e.preventDefault();
    var newMessage = $(this).find("#post-body").val();
    posts.create({message: newMessage},{wait:true});
    var temporaryId = parseInt( posts.last().attributes.id ) + 1;
    console.log(temporaryId);
    // console.log(posts.last().get('id'));
  });





});

// When I define username and id in the template, it breaks the app.  It also does not refresh when I add a new post



// All Posts - For Landing Page
//
// var AllPostCollection = Backbone.Collection.extend({
//   model: Post,
//   url: '/api/posts/all'
// });
//
//
// var AllPostListView = Backbone.View.extend({
//   initialize: function(){
//     this.listenTo(this.collection, 'add', this.render);
//   },
//   render: function(){
//     this.$el.empty();
//     var posts = this.collection.models;
//     var view;
//     for (var i = 0; i < posts.length; i++) {
//       view = new PostView({model: posts[i]});
//       view.render();
//       this.$el.append( view.$el );
//     }
//   }
// });



// var allPostsPainter = new PostListView({
//   collection: posts,
//   el: $('#all-post-list')
// });




// var critiquePainter = new Critique({
//   collection: posts,
//   el: $('#critique-list')
// });
