
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
      var $deleteButton = $("<a>").addClass("remove-critique").html("X");

      this.$el.find('.edit-critique-box').append( $editButton );
      this.$el.find('.remove-critique-box').append( $deleteButton );
    } else {
      console.log('not written by this user');
    }

  },

// Critique Events
  events:{
    'click a.remove-critique': 'removeCritique',
    'click button.delete-critique': 'deleteCritique',
    'click span.edit-critique': 'editCritique',

    'click span.vote': 'saveVote',
    'click span.down-vote': 'downVote',

    'click span.save-edited-critique': 'saveCritique',
    'click a.close-critique': 'render'
  },

  removeCritique: function(){
    console.log('remove critique clicked');
    var confirmModal = this.$el.find('#deleteCritique');
    confirmModal.modal('toggle');

  },

  deleteCritique: function(){
    console.log('delete critique clicked');
    var confirmModal = this.$el.find('#deleteCritique');
    confirmModal.modal('toggle');
    console.log(this.model);
    var urlModel = "/api/posts/" + this.model.get('post_id') + "/critiques/" + this.model.get('id');
    this.model.destroy({url: urlModel});
    this.$el.remove();
  },

  closeCritiqueForm: function(){
    this.$el.empty();
    this.render();
  },

  editCritique: function(){
    console.log('edit critique clicked');
    this.renderEdit();
  },
  renderEdit: function(){
    this.$el.empty();
    var formContainer = $('<div>').addClass('critique-form-container');
    this.$el.html( _.template( $('#critique-form-template').html()) );
    console.log('is this workin?');
    var message = this.model.get("message");
    $('#edit-critique').val( message );
  },
  saveCritique: function(){
    var postId = parseInt( this.model.get('post_id') );
    var newMessage = $('#edit-critique').val();
    var urlModel = '/posts/' + postId + '/critiques/' + this.model.get('id');
    console.log(newMessage);
    this.model.set('message', newMessage)
    this.model.save({url: urlModel});
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

  saveVote: function(e){
    e.preventDefault();
    console.log('span clicked');
    var postId = this.model.get('post_id')
    var critiqueId = this.model.get('id');
    var rating = 1;

    // In controller, make votes equal to
    // var currentValue = this.model.get('votes');

    var urlModel = '/api/posts/' + postId +'/critiques/' + critiqueId + '/votes';

    var newVote = new app.CritiqueVote({url: urlModel});
    newVote.url = urlModel;
    newVote.set('votes', rating);

    newVote.save();
  },

  upVote: function(){
    var postId = parseInt( this.model.get('post_id') );
    this.model.set('votes', this.model.get('votes') + 1);
    var urlModel = '/posts/' + postId + '/critiques/' + this.model.get('id');
    this.model.save({url: urlModel});
  },

  downVote: function(){
    var postId = parseInt( this.model.get('post_id') );

    if ( this.model.get('votes') > 0) {

      this.model.set('votes', this.model.get('votes') - 1);

    } else {

    }

    var urlModel = '/posts/' + postId + '/critiques/' + this.model.get('id');
    this.model.save({url: urlModel});
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
