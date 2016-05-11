var app = app || {};

app.RatingView = Backbone.View.extend({
  // DOM Element
  tagName: 'div',
  className: 'ratings-view',

  // Templates
  templateData: {},
  template: _.template( $( '#overall-ratings-template' ).html() ),
  // editingTemplate: _.template( $( '#edit-critique-template' ).html() ),

  // State
  // reading, editing, user
  state: 'reading',
  alreadyVoted: false,

  postId: 0,

  initialize: function() {
    // console.log(this.collection);
    // this.postId = this.model.get( 'id' );
  },

  render: function(){

    this.$el.empty();

    // console.log(this.model);

    this.templateData = {
      rating: this.model.toJSON(),
      user: app.currentUser
    }

    this.$el.append( $( this.template( this.templateData ) ) );

    var ratings = ['overall', 'plot', 'characters', 'settings'];

    // Apply ratings to DOM
    for (rating in ratings) {
      var skill = this.model.get( ratings[rating] );
      var ratingValue = this.model.get( ratings[rating] ).user_vote;

      this.setCurrentRating( skill, ratingValue );
      this.applyRatingColor( skill, ratingValue );
    }
  },

  url: function() {
    return '/api/posts/' + this.model.postId + '/ratings';
  },

  events: {
    'mouseover i.rating-heart'  :   'ratingsHover',
    'mouseout  i.rating-heart'  :   'ratingsHover',

    'click     .new-rating'     :   'saveRating'

  },

  ratingsHover: function( e ){
    var parent        =     $( e.currentTarget ).parent(),
        skillValue    =     parseInt( parent.data( 'value' ) ),
        skill         =     parent.data( 'skill' ),
        ratingDiv;

    if ( e.type === 'mouseover' ) {

      this.applyRatingColor( skill, skillValue );

    }
    else if ( e.type === 'mouseout' ) {

      if ( !parent.hasClass( 'rated' ) ) {
        this.removeRatingColor( skill, skillValue );
      }

    }
  },

  saveRating: function( e ){
    var ratingValue    =    parseInt( $( e.currentTarget ).attr( 'data-value' ) ),
        skill          =    $( e.currentTarget ).attr( 'data-skill' ),
        postId         =    parsetInt( this.model.get('id') );
        totalRatings   =    this.$el.find( '#rating-container-' + skill ).
                                     find( 'i' ).length;

    this.setCurrentRating( skill, ratingValue );
    this.applyRatingColor( skill, ratingValue );

    var newRating = new app.Rating();
    newRating.postId = this.model.postId;
    newRating.url = this.url();
    newRating.set( 'value', ratingValue );
    newRating.set( 'skill', skill );
    newRating.set( 'max_value', totalRatings );
    newRating.save();

  },

  applyRatingColor: function( skill, skillValue ) {
    var ratingDiv,
        $ratingDiv,
        totalRatings;

    for ( var i = 0; i <= skillValue; i++ ) {
      ratingDiv     =   '#rating-' + skill + '-' + i;
      $ratingDiv    =   this.$el.find( ratingDiv );

      this.$el.find( ratingDiv ).
               find( 'i' ).
               addClass( 'fa-heart' );

      this.$el.find( ratingDiv ).
               find( 'i' ).
               removeClass( 'fa-heart-o' );
    }

    // Make sure the rest are blank.
    var totalRatings = this.$el.find( '#rating-container-' + skill ).
             find( 'i' ).
             length;

    for ( var i = skillValue + 1; i <= totalRatings; i++ ) {
      ratingDiv     =   '#rating-' + skill + '-' + i;
      $ratingDiv    =   this.$el.find( ratingDiv );

      if ( !$ratingDiv.hasClass( 'rated' ) ) {
        $ratingDiv.
          find( 'i' ).
          removeClass( 'fa-heart' );

        $ratingDiv.
          find( 'i' ).
          addClass( 'fa-heart-o' );
      }
    }
  },

  setCurrentRating: function( skill, skillValue ) {
    var ratingDiv;

    for ( var i = 0; i <= skillValue; i++ ) {
      ratingDiv = '#rating-' + skill + '-' + i;

      this.$el.find( ratingDiv ).
               addClass( 'rated' );
    }

    var totalRatings = this.$el.find( '#rating-container-' + skill ).
                                find( 'i' ).
                                length;

    for ( var i = skillValue + 1; i <= totalRatings; i++ ) {
      ratingDiv     =   '#rating-' + skill + '-' + i;
      $ratingDiv    =   this.$el.find( ratingDiv );

      $ratingDiv.removeClass( 'rated' );
    }
  },

  removeRatingColor: function( skill, skillValue ) {
    var ratingDiv,
        $ratingDiv;

    for ( var i = 0; i <= skillValue; i++ ) {
      ratingDiv     =   '#rating-' + skill + '-' + i;
      $ratingDiv    =   this.$el.find( ratingDiv );

      if ( !$ratingDiv.hasClass( 'rated' ) ) {
        $ratingDiv.
          find( 'i' ).
          removeClass( 'fa-heart' );

        $ratingDiv.
          find( 'i' ).
          addClass( 'fa-heart-o' );
      }
    }
  },

  // Show Editing View
  // Show User View

});

// getSkillRatings: function(){
//
//   var skills = {
//     overall: this.model.get("skill_overall"),
//     characters: this.model.get("skill_characters"),
//     plot: this.model.get("skill_plot"),
//     theme: this.model.get("skill_theme"),
//     style: this.model.get("skill_style"),
//     grammar: this.model.get("skill_grammar"),
//     setting: this.model.get("skill_setting"),
//     dialogue: this.model.get("skill_dialogue"),
//     structure: this.model.get("skill_structure")
//   }
//
//     return skills;
//
// },

// removeColor: function(rating, skill){
//
//   for (var i = 0; i <= rating; i++) {
//     var divId = "#rating-" + skill + "-" + i;
//
//     this.$el.find(divId).find("i").removeClass("fa-heart");
//     this.$el.find(divId).find("i").addClass( "fa-heart-o" );
//
//
//   }
// },
