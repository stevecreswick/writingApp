var app = app || {};

app.FriendView = Backbone.View.extend({
  tagName: 'div',
  className: 'friend-view',
  template: _.template( $('#friend-view-template').html() ),
  initialize: function(){
  },
  render: function(){
    this.$el.empty();
    var html = this.template( this.model.toJSON() );
    var $html = $( html );
    this.$el.append( $html );
  },
  events: {
    'click button.remove-friend': 'removeFriend'
  },
  removeFriend: function(){
    console.log('remove friend clicked');

    var postId = this.model.get('id');
    var urlModel = "/api/friendships/" + this.model.get('id');
    this.model.destroy({ url: urlModel });
    this.$el.remove();
    app.friends.fetch();

  }

});
