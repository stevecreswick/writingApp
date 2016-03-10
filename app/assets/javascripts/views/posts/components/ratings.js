showRating: function(){

  var rating = this.model.get('avg_rating');

  if(rating){
    this.$el.find('#post-avg-rating').html("<div class='tiny-text'>Avg. Rating: " + rating + "/10 (" + this.model.get('total_ratings') + ")</div>");
  } else {
    this.$el.find('#post-avg-rating').html("<div class='tiny-text'>Be the First to Rate this Post.</div>");
  }
},

newRating: function(e){

  $(e.currentTarget).eq(0).addClass('rated-star');
  var rating = $(e.currentTarget).eq(0).data('value');

  // this.colorStars(rating);

  var post = $(e.currentTarget).eq(0);
  var postId = post.data('post');
  var ratingSkill = post.data('skill');
  var value = post.data('value');


  var urlModel = '/api/posts/' + postId + '/ratings';

  this.ratings = new app.RatingsCollection({url: urlModel});
  this.ratings.url = urlModel;

  this.ratings.create({
    value: value,
    skill: ratingSkill,
    });

  this.applyRating(value, ratingSkill);
},

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

applySkills: function(skills){

    for (var skill in skills) {
      if (skills.hasOwnProperty(skill)) {

        if (skills[skill] > 0) {
          this.applyRating(skills[skill], skill);
        }

      }
    }
},

applyRating: function(rating, skill){

  for (var i = 0; i <= rating; i++) {
    var divId = "#rating-" + skill + "-" + i;
    this.$el.find(divId).find("i").addClass("fa-heart rated");
    this.$el.find(divId).find("i").removeClass( "fa-heart-o" );
  }

  // Add a rated tag to every heart
  for (var i = 0; i <= 5; i++) {
    var divId = "#rating-" + skill + "-" + i;
    this.$el.find(divId).find("i").addClass("rated");
  }

},

colorRating: function(){

  if ( this.model.get('is_rated') ){

    var score = this.model.get('rating');
    // this.colorStars(score);

  } else {

  }

},

// Rating
saveRating: function(e){

  $(e.currentTarget).eq(0).addClass('rated-star');
  var rating = $(e.currentTarget).eq(0).data('value');

  this.colorStars(rating);

  var post = $(e.currentTarget).eq(0);
  var postId = post.data('post');
  var currentUser = $('#current_id').val();

  var urlModel = '/api/posts/' + postId + '/ratings';

  var newRating = new app.Rating({url: urlModel});
  newRating.url = urlModel;
  newRating.set('value', rating);

  newRating.save();

},

hoverHearts: function(){
  var scope = this;
  this.$el.find( ".new-rating i" ).hover(
    function() {
      var parent = $(this).parent();

      var value = parent.data("value");
      var skill = parent.data("skill");

      if ( $(this).hasClass('rated') ) {
      } else {
        scope.colorHearts(value, skill);
      }

    }, function() {
      var parent = $(this).parent();

      var value = parent.data("value");
      var skill = parent.data("skill");

      if ( $(this).hasClass('rated') ) {
      } else {
        scope.removeColor(value, skill);
      }


    });


},

colorHearts: function(rating, skill){

  for (var i = 0; i <= rating; i++) {
    var divId = "#rating-" + skill + "-" + i;

      this.$el.find(divId).find("i").addClass("fa-heart");
      this.$el.find(divId).find("i").removeClass( "fa-heart-o" );

  }
},

removeColor: function(rating, skill){

  for (var i = 0; i <= rating; i++) {
    var divId = "#rating-" + skill + "-" + i;

    this.$el.find(divId).find("i").removeClass("fa-heart");
    this.$el.find(divId).find("i").addClass( "fa-heart-o" );


  }
},
