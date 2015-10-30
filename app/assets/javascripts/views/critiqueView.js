
var app = app || {};

app.CritiqueView = Backbone.View.extend({
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

    var authorId = this.model.get('user_id');
    var currentId = parseInt( $('#current_id').val() );


    if ( authorId === currentId ){
      var $editButton = $("<span>").addClass("edit-critique").html("Edit");
      var $deleteButton = $("<button>").addClass("remove-critique btn btn-danger").html("X");

      // Bind Confirm Modal


      this.$el.find('.edit-critique-box').append( $editButton );
      this.$el.find('.remove-critique-box').append( $deleteButton );
    } else {
      console.log('not written by this user');
    }

  },

// Critique Events
  events:{
    'click button.remove-critique': 'removeCritique',
    'click button.delete-critique': 'deleteCritique',
    'click span.edit-critique': 'editCritique'
  },

  removeCritique: function(){
    console.log('remove critique clicked');
    var confirmModal = this.$el.find('#deleteCritique');
    confirmModal.modal('toggle');

    // .on('shown.bs.modal', function () {
    //   $('#myInput').focus()
    // });
    // this.model.destroy();
    // this.$el.remove();
  },

  deleteCritique: function(){
    console.log('delete critique clicked');
    var confirmModal = this.$el.find('#deleteCritique');
    var backdrop = this.$el.find('.modal-backdrop');

    confirmModal.modal('toggle');
    backdrop.remove();
    this.model.destroy();
    this.$el.remove();
  },

  editCritique: function(){
    console.log('edit critique clicked');
    this.renderCritiqueForm();
  },
  renderCritiqueForm: function(){
    this.$el.empty();
    this.renderCritiqueFormContainer();
    this.renderEditor();

    var message = this.model.get("message");
    $('#critique-editor').first().eq(0).children().eq(0).children().eq(0).html( message );

    var postId = parseInt( this.model.get('post_id') );
    this.bindCritiqueForm(postId);
  },
  renderCritiqueFormContainer: function(){
    var formContainer = $('<div>').addClass('critique-form-container');

    formContainer.html( _.template( $('#critique-form-template').html()) );

    this.$el.append( formContainer );
  },
  bindCritiqueForm: function(postId){
    var scope= this;
    $('form#create-critique').on('submit', function(e){
      e.preventDefault();

      // Grab Message from div created by Quill Editor
      var newMessage = scope.$('#critique-editor').first().eq(0).children().eq(0).html();
      var urlModel = "/api/posts/" + postId + "/critiques/" + scope.model.get("id");

      scope.model.set("message", newMessage);
      scope.model.save({url: urlModel});
      scope.render();
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
