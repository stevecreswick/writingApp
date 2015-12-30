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

    var $removeFriend = $('<a>').addClass('remove-friend btn btn-raised btn-fab btn-danger').html('<i class="fa fa-user-times"></i>');
    var $addFriend = $('<a>').addClass('add-friend btn btn-raised btn-fab btn-success').html('<i class="fa fa-user-plus"></i>');
    var $br = $('<br>')

    if ( this.model.get('is_friend') ){
      this.$el.find('#friend-button-holder').append($removeFriend, "Remove Friend");
    } else {
      this.$el.find('#friend-button-holder').append($addFriend, "Add Friend");
    }

    this.renderShowPostsButton();

    // this.fetchChallenges();
  },

  resize: function(){
    this.$el.css({'height': '20em'})
  },

  events: {
    'click .remove-friend': 'removeFriend',
    'click .add-friend': 'addFriend',
    'click .make-challenge': 'makeChallenge',
    'click .show-challenges': 'showChallenges',
    'click .show-user-posts': 'showPosts',
    'click .hide-user-posts': 'hidePosts',
    'click .about-the-author-show': 'showInfo',
    'click .about-the-author-hide': 'hideInfo'

  },

  addFriend: function(){
    // var friendID = this.$el.find('.friend-id-holder').val();
    // var userID = this.model.get('id');
    this.addedFriend = new app.FriendCollection();
    this.addedFriend.fetch();
    this.addedFriend.url = "/api/friendships/" + this.model.get('id');
    var urlModel = "/api/friendships/" + this.model.get('id')
    this.addedFriend.create({friend_id: this.model.get('id'), url: urlModel });
    this.$el.remove();
    app.friends.fetch();
  },

  showInfo: function(){
    this.$el.find("#author-info").show("slow");
    this.$el.find(".about-the-author-show").html("<i class='fa fa-times'></i>")
    this.$el.find(".about-the-author-show").addClass('about-the-author-hide btn-danger').removeClass('about-the-author-show btn-info');
  },

  hideInfo: function(){
    this.$el.find("#author-info").hide("slow");
    this.$el.find(".about-the-author-hide").html("<i class='fa fa-info'></i>")
    this.$el.find(".about-the-author-hide").addClass('about-the-author-show btn-info').removeClass('about-the-author-hide btn-danger');
  },

  removeFriend: function(){
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
    var friendId = this.model.get('id');
    var friendship = app.friends.where({id: friendId})[0];

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
      var $postList = this.$el.find("#post-list")
      posts.page = this.currentPage;
      var postPainter = new app.PostListView({
        collection: posts,
        el: $postList
      });

      var urlModel = "/api/posts/users/" + userId
      posts.fetch({url: urlModel, async:false});

      app.postPainter.render();

      this.renderHidePostsButton();

      $postList.show("slow");
    },

    createPostList: function(){
      var oldList = this.$el.find("#post-list");
      oldList.remove();

      var $container = $('<div>').attr('id', 'post-list');
      $container.hide()
      this.$el.find("#author-info").append( $container );

    },

    hidePosts: function(){
      var scope = this;
      this.$el.find("#post-list").hide('slow', function(){ scope.$el.find("#post-list").remove(); });
      this.renderShowPostsButton();

    },

    renderShowPostsButton: function(){
      this.$el.find(".user-posts-container").empty();


      var $seePosts = $('<a>').addClass('show-user-posts btn btn-raised btn-fab btn-info').html("<i class='fa fa-file'></i>");
      this.$el.find(".user-posts-container").append( $seePosts, "See Posts (" + this.model.get("posts") + ")" );
    },

    renderHidePostsButton: function(){
      this.$el.find(".user-posts-container").empty();

      var $hide = $('<h5>').addClass('hide-user-posts btn btn-raised btn-fab btn-danger').html( "<i class='fa fa-times'></i>" );
      this.$el.find(".user-posts-container").append($hide, "Hide Posts");

    }


});
