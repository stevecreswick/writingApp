
var app = app || {};

app.CritiqueView = Backbone.View.extend({
  tagName: 'div',
  className: 'critique-view',
  template: null,
  defaultTemplate: _.template( $('#critique-template').html() ),
  editingTemplate: _.template( $('#edit-critique-template').html() ),
  deletingTemplate: _.template( $('#delete-critique-template').html() ),

  templateData: {},

  state: 'reading',
  // states: reading, editing, deleting

  currentVote: 0,

  url: function() {
    return '/api/posts/' + this.postId + '/critiques/' + this.crtiqueId;
  },

  initialize: function(){
    this.listenTo( this.model, 'change', this.render );
    this.postId = this.model.get('post_id');
    this.crtiqueId = this.model.get('id');
  },

  render: function(){
    this.$el.empty();
    this.getTemplate();

    this.templateData = {
      critique: this.model.toJSON(),
      user: app.currentUser
    }

    var html = this.template( this.templateData );
    var $html = $( html );
    this.$el.append( $html );
  },

  getTemplate: function() {

    if ( this.state === 'editing' ) {
      this.template = this.editingTemplate;
    } else if ( this.state === 'deleting' ) {
      this.template = this.deletingTemplate;
    } else {
      this.template = this.defaultTemplate;
    }
  },

// Critique Events
  events: {
    // Editing
    'click div.edit-critique'        :   'toggleEditingState',
    'click div.cancel-editing'       :   'toggleEditingState',
    'click #save-edited-critique'    :   'saveEditedCritique',

    // Deleting
    'click .remove-critique'         :   'toggleDeletingState',
    'click .cancel-delete'           :   'toggleDeletingState',
    'click .delete-critique'         :   'deleteCritique',

    // Voting
    'click .submit-vote'             :   'submitVote',
    'click .change-to-vote'          :   'submitVote',
  },

  // ---------------------------------------------------------------------------
  // View State

  // Toggle State
  toggleEditingState: function() {
    this.state === 'editing' ?
      this.state = 'reading' :
      this.state = 'editing';

    this.render();
  },

  toggleDeletingState: function() {
    this.state === 'deleting' ?
      this.state = 'reading' :
      this.state = 'deleting';

    this.render();
  },

  // Update View
  fetchModel: function() {
    var scope = this;
    this.model.url = this.url();
    this.model.fetch( { url: this.url() } ).
      then(
        function(){
          scope.render();
        }
      );
  },

  // ---------------------------------------------------------------------------
  // Editing
  saveEditedCritique: function(){
    var scope = this;
    var postId = parseInt( this.model.get('post_id') );
    var newMessage = $('#edited-message').val();
    var urlModel = '/api/posts/' + postId + '/critiques/' + this.model.get('id');
    this.model.set('message', newMessage)
    this.model.url = urlModel;
    this.model.save().
      then(
        function() {
          scope.toggleState();
        }
      );
  },

  // ---------------------------------------------------------------------------
  // Deleting
  deleteCritique: function(){
    console.log('delete critique clicked');
    console.log(this.model);
    var urlModel = "/api/posts/" + this.model.get('post_id') + "/critiques/" + this.model.get('id');
    this.model.destroy( { url: this.url() } );
    this.$el.remove();
  },

  // ---------------------------------------------------------------------------
  // Voting
  submitVote: function( e ){
    var rating          =   $( e.currentTarget ).attr( 'data-rating' ),
        urlModel        =   this.url() + '/votes';

    var newVote = new app.CritiqueVote( { url: urlModel } );
    newVote.url = urlModel;
    newVote.set( 'value', rating );

    newVote.save();

    this.fetchModel();
  },
});
