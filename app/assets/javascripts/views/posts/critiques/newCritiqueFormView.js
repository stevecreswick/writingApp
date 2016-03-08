// var app = app || {};
//
// app.CritiqueFormView = Backbone.View.extend({
//   tagName: 'div',
//   className: 'critique-form-container',
//   template: _.template( $('#critique-form-template').html() ),
//   initialize: function(){
//
//   },
//   render: function(){
//     this.$el.empty();
//     var html = this.template( this.model.toJSON() );
//     var $html = $( html );
//     this.$el.append( $html );
//
//     var poster = this.model.get('username');
//     var currentUser = $('#current_user').val()
//     var $deleteButton = $("<p>").addClass("remove-post").html("delete this post");
//     var $makeCritique = $("<button>").addClass("make-critique btn btn-info").html("Make Critique");
//     var $showCritique = $("<p>").addClass("render-critiques").html("Show Critiques");
//
//     this.$el.find(".show-critiques-box").append( $showCritique );
//
//     // Add delete button for current user critique for other
//     if (currentUser === poster) {
//       this.$el.find(".remove-post-box").append( $deleteButton );
//     }
//
//   },
//
//     events:{
//       'click p.remove-post': 'removePost',
//       'click button.delete-post': 'deletePost',
//       'click button.make-critique': 'renderCritiqueForm',
//       // 'click a.close-critique': 'closeCritiqueForm',
//       'click p.render-critiques': 'renderCritiques',
//
//     },
