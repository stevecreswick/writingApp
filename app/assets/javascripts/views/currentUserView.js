var app = app || {};

app.CurrentUserView = Backbone.View.extend({
  tagName: 'div',
  className: 'user-view',
  template: _.template( $('#current-user-template').html() ),
  page: 0,

  initialize: function(){
    this.listenTo( this.model, 'change', this.render );

  },
  render: function(){
    this.$el.empty();
    var html = this.template( this.model.toJSON() );
    var $html = $( html );
    this.$el.append( $html );

    var profilePic = this.model.get('image_url');
    var $profilePic = $('<img>').attr("src", profilePic).addClass('user-profile-picture img-circle');
    this.$el.find('.user-pic-box').append($profilePic);

    console.log(this.model.get('username'));
  },
  events:{

  },



});
