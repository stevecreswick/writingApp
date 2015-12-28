var app = app || {};

app.ChallengeView = Backbone.View.extend({
  tagName: 'div',
  className: 'challenge-view',
  template: _.template( $('#challenge-template').html() ),

  initialize: function(){
    this.listenTo( this.model, 'change', this.render );
  },
  render: function(){
    this.$el.empty();
    var html = this.template( this.model.toJSON() );
    var $html = $( html );
    this.$el.append( $html );

    var $img = $("<img>").addClass("img-circle profile-picture").attr("src", this.model.get("image_url") );

    this.$el.find(".challenged-user").append( $img, "&nbsp;", this.model.get("username") )

  },
  events:{
    'click button.remove-challenge': 'removeChallenge'
  },

  removeChallenge: function(){
    console.log('remove challenge clicked');


    var urlModel = '/api/friendships/' + this.model.get('friendship_id') + '/challenges/' + this.model.get('id');
    console.log(urlModel);

    this.model.destroy({"url": urlModel});
    this.$el.remove();
  },


});
