var app = app || {};

app.PostView = Backbone.View.extend({
  tagName: 'div',
  className: 'post-preview',
  template: _.template( $( '#post-preview-template' ).html() ),

  reviewing: false,
  templateData: null,

  ratings: null,

  getTemplate: function() {
    this.reviewing ?
      this.template = _.template( $( '#post-open-template' ).html() ) :
      this.template = _.template( $( '#post-preview-template' ).html() );
  },


  getRatings: function( skill ) {

    this.model.ratings = new app.RatingsCollection();
    this.model.ratings.postId = parseInt( this.model.get( 'data' )[ 'id' ] );
    this.model.ratings.ratingId = 5;
    this.model.ratings.skill = skill;

    this.ratingsList = new app.RatingsListView({
      collection: this.model.ratings,
      el: $( '#post-ratings' )
    });

    var scope = this;
    this.model.ratings
      .fetch( { url: this.model.ratings.url() } )
        .done(
          function(){
            scope.ratingsList.render();
          }
        );
  },

  render: function(){
    this.$el.empty();
    this.getTemplate();

    this.templateData = {
      post: this.model.toJSON(),
      user: app.currentUser
    }
    console.log(this.model.get('avg_rating'));
    this.$el.append( $( this.template( this.templateData ) ) );

  },

  events: {
    'click  .read-full-post'    :   'togglePost',
    'click  .close-full-post'   :   'togglePost',
    'click  .review-link'       :   'toggleFeedbackType',

    'click  .delete-post'       :   'confirmDelete',
    'click  .destroy-post'       :  'deletePost',

    'click  #create-critique'   :   'createCritique'
  },

  togglePost: function() {
    var $post;

    this.reviewing ?
      $post = this.$el.children().first() :
      $post = this.$el.find( '.post-preview-container' );

    this.reviewing ?
      $( '#main-page' ).css( { 'overflow' : 'auto' } ) :
      $( '#main-page' ).css( { 'overflow' : 'hidden' } );

    this.reviewing = !this.reviewing;

    $post.toggleClass( 'post-open' );

    if ($post.hasClass( 'post-open' )) {
      this.renderCritiques();
    }

    this.render();
    this.getRatings( 'overall' );
  },

  toggleFeedbackType: function() {
      this.$el.find( '.feedback-feed' ).toggleClass( 'hidden' );
      this.$el.find( '.ratings-view' ).toggleClass( 'hidden' );
  },

  confirmDelete: function() {
    this.$el.find( '.confirm-delete-post' ).toggleClass( 'hidden' );
  },

  deletePost: function() {
    // var scope = this;
    console.log('deleting');
    this.model.id = this.model.get( 'data' )[ 'id' ];
    this.model.destroy();
      // .done(
      //   function() {
      //     scope.$el.remove();
      //   }
      // );
    this.$el.remove();
  },

// Critiques
  renderCritiques: function() {
    this.critiques = new app.CritiqueCollection();
    this.critiques.postId = this.model.get( 'data' )[ 'id' ];

    var scope = this;

    this.critiques.fetch( { url: this.critiques.url() } )
      .done(
        function() {
          scope.critiquesFeed = new app.CritiqueListView( {
            collection: scope.critiques,
            el: $('#feedback-feed')
          } );

          scope.critiquesFeed.render();
        }
      );
  },

  createCritique: function() {
    var scope = this;
    var newMessage = $( '#critique-text' ).val();
    var urlModel = '/api/posts/' + this.model.get( 'data' )[ 'id' ] + '/critiques'
    this.critiques.create(
      {
        message: newMessage,
        username: app.currentUser.username,
        image_url: app.currentUser.image_url
      },
        {
          url: urlModel,
          wait: true,
          async: false
        }
    );
  }
});
