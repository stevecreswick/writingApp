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
  model: Critique,
  // initialize: function(models, options) {
  //   this.id = options.id;
  //   console.log(this.id);
  //   if(typeof this.id === 'undefined') { return; }
  //   this.url = this.getUrl();
  // },
  // getUrl: function() {
  //   console.log(this.id);
  //   return "/api/critiques/" + this.id;
  // }
});

// SHOW the critique
// var CritiqueView = Backbone.View.extend({
//   tagName: 'div',
//   className: 'critique',
//   template: _.template( $('#critique-template').html() ),
//   render: function(){
//     this.$el.empty();
//     var html = this.template( this.model.toJSON() );
//     var $html = $( html );
//     this.$el.append( $html );
//   }
// });
//
// var CritiqueListView = Backbone.View.extend({
//   initialize: function(){
//     this.listenTo(this.collection, 'add', this.render);
//   },
//   el: '#critique-list',
//   render: function(){
//     this.$el.empty();
//     var critiques = this.collection.models;
//     var view;
//     for (var i = 0; i < critiques.length; i++) {
//       view = new CritiqueView({model: critiques[i]});
//       view.render();
//       this.$el.append( view.$el );
//     }
//   }
// });

// Model
var Post = Backbone.Model.extend({
  initialize: function(option){
    console.log('post model:' + option.id)
    this.critiques = new CritiquesCollection();
    this.critiques.url = "/api/posts/" + this.id + "/critiques"
    this.critiques.fetch({async:false});
  }
});

// Collection
var PostCollection = Backbone.Collection.extend({
  model: Post,
  url: '/api/posts',
  initialize: function() {
    this.on('reset', this.getCritiques, this);
  },
  // getCritiques: function() {
  //   this.each(function(post) {
  //     post.critiques = new CritiquesCollection({ post: post });
  //     post.critiques.fetch();
  //   });
  // }
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

    console.log(this.model.critiques);
    for (var i = 0; i < this.model.critiques.models.length; i++) {
      var critique = this.model.critiques.models[i]
      $html.append(critique.get('message'));
      console.log(critique.get('message'));
    }


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


// All Posts - For Landing Page

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


// var critiquePainter = new Critique({
//   collection: posts,
//   el: $('#critique-list')
// });



allposts.fetch();
posts.fetch();


//On Load

$( document ).ready(function() {


  $('form#submit-new-post').on('submit', function(e){
    e.preventDefault();
    var newTitle = $(this).find("#post-title").val();
    var newMessage = $(this).find("#post-body").val();
    posts.create({message: newMessage});
  });


});
