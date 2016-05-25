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
    this.model.ratings.postId = parseInt( this.model.get( 'id' ) );
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

    this.$el.append( $( this.template( this.templateData ) ) );

    this.renderCritiques();
  },

  events: {
    'click  .read-full-post'    :   'togglePost',
    'click  .close-full-post'   :   'togglePost',
    'click  .review-link'       :   'toggleFeedbackType',

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
    this.render();
    this.getRatings( 'overall' );
  },

  toggleFeedbackType: function() {
      this.$el.find( '.feedback-feed' ).toggleClass( 'hidden' );
      this.$el.find( '.ratings-view' ).toggleClass( 'hidden' );
  },

// Critiques
  renderCritiques: function() {
    this.model.critiques = new app.CritiqueCollection();
    this.model.critiques.postId = this.model.get( 'id' );

    this.critiquesFeed = new app.CritiqueListView({
      collection: this.model.critiques,
      el: $('#feedback-feed')
    });

    var scope = this;
    this.model.critiques.fetch({url: this.model.critiques.url()})
      .done(
        function(){
          scope.critiquesFeed.render();
        }
      );
  },

  createCritique: function() {
    var scope = this;
    var newMessage = $( '#critique-text' ).val();
    var urlModel = '/api/posts/' + this.model.get('id') + '/critiques'
    this.model.critiques.create(
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
