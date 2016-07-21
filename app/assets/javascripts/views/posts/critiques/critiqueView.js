
var app = app || {};

app.CritiqueView = Backbone.View.extend({
  // DOM Element
  tagName: 'div',
  className: 'critique-view',

  // Templates
  template: null,
  templateData: {},
  defaultTemplate: _.template( $( '#critique-template' ).html() ),
  editingTemplate: _.template( $( '#edit-critique-template' ).html() ),
  deletingTemplate: _.template( $( '#delete-critique-template' ).html() ),

  // State
  // [reading, editing, deleting]
  state: 'reading',

  // ---------------------------------------------------------------------------
  // Initialize

  initialize: function(){
    // this.listenTo( this.model, 'change', this.render );
    this.postId = this.model.get('post_id');
    this.crtiqueId = this.model.get('id');
  },

  url: function() {
    return '/api/posts/' + this.postId + '/critiques/' + this.crtiqueId;
  },

  // ---------------------------------------------------------------------------
  // Rendering

  render: function(){
    this.$el.empty();
    this.getTemplate();

    this.templateData = {
      critique: this.model.toJSON(),
      user: app.currentUser
    }

    this.$el.append(
      $( this.template( this.templateData ) )
    );
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

  // ---------------------------------------------------------------------------
  // Event Handling

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
  // Control View State

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

  // Update Model
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
    var scope         =    this,
        postId        =    parseInt( this.model.get('post_id') ),
        newMessage    =    $('#edited-message').val(),
        urlModel      =    '/api/posts/' + postId + '/critiques/' + this.model.get('id');

    this.model.set('message', newMessage)
    this.model.url = urlModel;

    this.model.save().
      then(
        function() {
          scope.toggleEditingState();
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
    var rating       =   $( e.currentTarget ).attr( 'data-rating' ),
        urlModel     =   this.url() + '/votes';

    var newVote = new app.CritiqueVote( { url: urlModel } );
    newVote.url = urlModel;
    newVote.set( 'value', rating );

    newVote.save();

    this.fetchModel();
  },
});
