var app = app || {};

app.FriendButtonView = Backbone.View.extend({
  tagName: 'div',
  className: 'friend-view',
  template: _.template( $('#friend-button-template').html() ),

  initialize: function(){
  },
  render: function(){
    this.$el.empty();
    var html = this.template();
    var $html = $( html );
    this.$el.append( $html );
  },

// Critique Events
  events:{
    'click button.show-friends': 'showFriends'
  },
  showFriends: function(){
    console.log('show friends clicked');
  }

});
