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

    app.friends.fetch()
    console.log( app.friends );
    var test = _.where(app.friends, {user_id: 2});
    app.friends.find()
    console.log( test );




    var pendingFriendships = new app.PendingFriendCollection();

    // app.friendPainter = new app.FriendListView({
    //   collection: friendships,
    //   el: $('#left-pane')
    // });
    pendingFriendships.fetch();
    // friendships.fetch();

    console.log("Friend ID " + friendID);
    console.log("User ID " + userID);
    // Get the Friend ID
    // Get the User ID
    // Check if a friendship exists between the two parties
    // Add friend logic
  }

});
