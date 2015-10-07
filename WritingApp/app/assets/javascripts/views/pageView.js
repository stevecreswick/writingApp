var app = app || {};

app.PageView = Backbone.View.extend({
  tagName: 'div',
  className: 'container-fluid',
  template: _.template( $('#main-page-template').html() ),
  initialize: function(){

  },
  render: function(){
    this.$el.empty();
    var html = this.template();
    var $html = $( html );
    this.$el.append( $html );
  },
  empty: function(){
    this.$el.empty();
  },
  events:{
    'click li.show-friends': 'showFriends',
    'click li.add-friends': 'addFriends'
  },
  showFriends: function(){
    console.log('show friends clicked');
    // $('#left-pane').empty();
    app.friends = new app.FriendCollection();
    app.friendPainter = new app.FriendListView({
      collection: app.friends,
      el: $('#left-pane')
    });

    app.friends.fetch();
  },
  addFriends: function(){
    app.users = new app.UserCollection();
    app.userPainter = new app.UserListView({
      collection: app.users,
      el: $('#left-pane')
    });

    app.users.fetch();
  },
  renderPosts: function(){
    app.posts = new app.PostCollection();
    app.postPainter = new app.PostListView({
      collection: app.posts,
      el: $('#right-pane')
    });

    app.posts.fetch();
  },
  renderPromptForm: function(){
    app.promptFormPainter = new app.promptFormView({
      el: $('#left-pane')
    });

    app.promptFormPainter.render();
    app.promptFormPainter.bindSlider();

  }

});
