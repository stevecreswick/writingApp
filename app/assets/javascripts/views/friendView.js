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

    var profilePic = this.model.get('image_url');
    var $profilePic = $('<img>').attr("src", profilePic).addClass('user-profile-picture img-circle');
    this.$el.find('.user-pic-box').append($profilePic);

    // this.fetchChallenges();
  },

  resize: function(){
    this.$el.css({'height': '20em'})
  },

  events: {
    'click button.remove-friend': 'removeFriend',
    'click button.make-challenge': 'makeChallenge',
    'click button.show-challenges': 'showChallenges'
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

});
