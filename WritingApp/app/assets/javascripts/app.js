console.log('...app.js loaded')

var token = $('#api-token').val();
$.ajaxSetup({
  headers:{
    "accept": "application/json",
    "token": token
  }
});

// Model
var Post = Backbone.Model.extend({});

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
  render: function(){
    this.$el.empty();
    var html = this.template( this.model.toJSON() );
    var $html = $( html );
    this.$el.append( $html );
  },
  events:{
    'click button.remove': 'removePost'
  },
  removePost: function(){
    this.model.destroy();
    this.$el.remove();
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
      view.render();
      this.$el.append( view.$el );
    }
  }
});

// //Critiques
//
// var Critique = Backbone.Model.extend({});
//
// // Collection
// var CritiqueCollection = Backbone.Collection.extend({
//   model: Critique,
//   url: '/api/critiques'
// });
//
// // Views
// var PostView = Backbone.View.extend({
//   tagName: 'div',
//   className: 'critique',
//   template: _.template( $('#post-template').html() ),
//   render: function(){
//     this.$el.empty();
//     var html = this.template( this.model.toJSON() );
//     var $html = $( html );
//     this.$el.append( $html );
//   },
//   events:{
//     'click button.remove': 'removePost'
//   },
//   removePost: function(){
//     this.model.destroy();
//     this.$el.remove();
//   }
//
// });
//
// var PostListView = Backbone.View.extend({
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
// Model

// Collection
var AllPostCollection = Backbone.Collection.extend({
  model: Post,
  url: '/api/posts/all'
});


var AllPostListView = Backbone.View.extend({
  initialize: function(){
    this.listenTo(this.collection, 'add', this.render);
  },
  render: function(){
    this.$el.empty();
    var posts = this.collection.models;
    var view;
    for (var i = 0; i < posts.length; i++) {
      view = new PostView({model: posts[i]});
      view.render();
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

var allposts = new AllPostCollection();
var allpostsPainter = new AllPostListView({
  collection: allposts,
  el: $('#all-post-list')
});

allposts.fetch();
posts.fetch();


//On Load

$( document ).ready(function() {


  $('form#create-post').on('submit', function(e){
    e.preventDefault();
    var newTitle = $(this).find("#post-title").val();
    var newMessage = $(this).find("#post-body").val();
    posts.create({message: newMessage});
  });


});
