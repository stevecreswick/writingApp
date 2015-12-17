var app = app || {};

app.FriendView = Backbone.View.extend({
  tagName: 'div',
  className: 'friend-view',
  template: _.template( $('#friend-view-template').html() ),

  currentPage: 0,

  initialize: function(){
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

    var $removeFriend = $('<span>').addClass('remove-friend').text('Remove Friend');
    var $addFriend = $('<span>').addClass('add-friend').text('Add Friend');
    var $br = $('<br>')

    if ( this.model.get('is_friend') ){
      this.$el.find('#friend-button-holder').append($removeFriend);
    } else {
      this.$el.find('#friend-button-holder').append($addFriend);
    }

    // this.fetchChallenges();
  },

  resize: function(){
    this.$el.css({'height': '20em'})
  },

  events: {
    'click span.remove-friend': 'removeFriend',
    'click span.add-friend': 'addFriend',
    'click button.make-challenge': 'makeChallenge',
    'click button.show-challenges': 'showChallenges',
    'click .show-user-posts': 'showPosts'

  },

  addFriend: function(){
    console.log('add friend clicked');
    // var friendID = this.$el.find('.friend-id-holder').val();
    // var userID = this.model.get('id');
    this.addedFriend = new app.FriendCollection();
    this.addedFriend.fetch();
    console.log(this.model.get('id'));
    this.addedFriend.url = "/api/friendships/" + this.model.get('id');
    var urlModel = "/api/friendships/" + this.model.get('id')
    this.addedFriend.create({friend_id: this.model.get('id'), url: urlModel });
    app.friends.fetch();
  },

  removeFriend: function(){
    console.log('remove friend clicked');

    var postId = this.model.get('id');
    var urlModel = "/api/friendships/" + this.model.get('id');
    this.model.destroy({ url: urlModel });
    this.$el.remove();
    app.friends.fetch();

  },

  makeChallenge: function(){
    this.resize();
    this.$el.find('#challenge-view').children().remove();

    var $challenge = $('<div>').attr('id', 'challenge-view');
    this.$el.append( $challenge )
    console.log('make challenge clicked');
    console.log('Friend ID : ' + this.model.get('id') );
    var friendId = this.model.get('id');
    var friendship = app.friends.where({id: friendId})[0];
    console.log( friendship );

    app.challengePainter = new app.ChallengeFormView({
      el: $('#challenge-view'),
      model: friendship
    });
    app.challengePainter.render();
    // console.log( app.friends.where({friend_id: this.model.get('id')});
  },

  fetchChallenges: function(){
    friendship = this.model.get('id');

    this.challenges = new app.ChallengeCollection();
    this.challenges.url = '/api/friendships/' + friendship + '/challenges';
    this.challenges.fetch()
    console.log(this.challenges);
    },

    showChallenges: function(){
      this.$el.find('#challenge-view').remove();
      var $challenge = $('<div>').attr('id', 'challenge-view');
      this.$el.append( $challenge )

      this.fetchChallenges();
      // Fetch critiques not working?

      var challengePainter = new app.ChallengeListView({
        collection: this.challenges,
        el: this.$('#challenge-list')
      });

      challengePainter.render();
      // this.$el.append(this.innerListView.$el);
    },

    showPosts: function(){
      this.createPostList();
      this.renderPosts();

    },

    renderPosts: function(){
      // this.emptyCenter();

      this.createPostList();

      var posts = new app.PostCollection();
      var userId = this.model.get('id');
      console.log(userId);
      var testEl = this.$el.find("#post-list")
      posts.page = this.currentPage;
      var postPainter = new app.PostListView({
        collection: posts,
        el: testEl
      });

      var urlModel = "/api/posts/users/" + userId
      posts.fetch({url: urlModel, async:false});

      app.postPainter.render();

    },

    createPostList: function(){
      var oldList = this.$el.find("#post-list");
      oldList.remove();

      var $container = $('<div>').attr('id', 'post-list');
      this.$el.append( $container );

    }

});
