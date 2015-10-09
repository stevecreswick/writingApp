var app = app || {};

app.UserView = Backbone.View.extend({
  tagName: 'div',
  className: 'user-view',
  template: _.template( $('#user-view-template').html() ),
  initialize: function(){

  },
  render: function(){
    this.$el.empty();
    var html = this.template( this.model.toJSON() );
    var $html = $( html );
    this.$el.append( $html );
  },
  events:{
    'click button.add-friend': 'addFriend'
  },
  addFriend: function(){
    console.log('add friend clicked');
    var friendID = this.$el.find('.friend-id-holder').val();
    var userID = this.model.get('id');
    this.addedFriend = new app.FriendCollection();
    var urlModel = "/api/friendships/" + this.model.get('id');
    console.log(urlModel);
    this.addedFriend.fetch();
    this.addedFriend.url = urlModel;
    this.addedFriend.create({friend_id: this.model.get('id')});
    app.friends.fetch();
  }

});
