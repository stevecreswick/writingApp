var app = app || {};

app.ChallengeFormView = Backbone.View.extend({
  tagName: 'div',
  className: 'challenge-form',
  template: _.template( $('#make-challenge-template').html() ),
  currentPage: 0,

  initialize: function(){
    this.bindSlider();
  },
  render: function(){
    this.$el.empty();
    var html = this.template();
    var $html = $( html );
    this.$el.append( $html );
    this.bindSlider();
    this.bindSubmit();

    this.sentChallenges();
  },

  renderWithFriendsList: function(){
    //
    app.friends = new app.FriendCollection();
    //

    var $select = $('<select>').addClass("form-control").attr("id", "friend-challenged");
    var scope = this;

    app.friends.fetch({url: "/users/all_friends", wait:true}).done(function(){


      if (app.friends.models.length >  0) {

        for (var i = 0; i < app.friends.models.length; i++) {
          $option = $('<option>').val( app.friends.models[i].get('id')  ).html(app.friends.models[i].get('username'));
          console.log(app.friends.models[i].get('username'));
          $select.append( $option );

        }
          scope.render();
          scope.$el.find("#choose-friend-container").append( $select );


      } else if (app.friends.models.length === 0) {

      var $none = _.template( $('#no-friends-screen').html() );

      $('#challenge-page').append( $none );

      }



    });


  },

  events:{
    'click button.render-challenge': 'getChallenge',
    'click .issue-challenge': 'issueChallenge'
  },

  issueChallenge: function(){
    console.log('issuing');
    var friend = $("#friend-challenged").val();

    var selectElement = document.getElementById("friend-challenged");
    var friendName = selectElement.options[selectElement.selectedIndex].text;

    var prompt = $("#challenge-prompt").val();
    var wordCount = $("#challenge-word-count").val();

    if (prompt.length > 0){
      challenges = new app.ChallengeCollection();
      challenges.url = '/api/friends/' + friend + '/challenges';
      challenges.create({prompt: prompt, word_count: wordCount});

      $("#challenge-prompt").val("");


      this.sentChallenges();
    } else {
      var failure = $("<span>").addClass("alert").html("Please enter a prompt");
      this.$el.find("#challenge-alert-box").append( failure );
    }

    // this.$el.append()
  },


  sentChallenges: function(){
    this.$el.find("#challenge-list").remove();
    var $challengeList = $("<div>").attr("id", "challenge-list");
    this.$el.append( $challengeList );

    var sentChallenges = new app.SentChallengeCollection();

    var sentChallengesPainter = new app.SentChallengeListView({
      collection: sentChallenges,
      el: $('#challenge-list')
    });

    var urlModel = "/api/challenges/sent/" + app.pagePainter.currentPage;
    console.log(urlModel);

    sentChallenges.fetch({url: urlModel});



    if ( sentChallenges.models.length === 0){
      var $none = _.template( $('#no-challenges-screen').html() );
      this.$el.find('#challenge-page').append( $none );
    }


  },


  createChallenge: function(prompt, wordCount){
    console.log('creating challenge');
    console.log(prompt);
    console.log(wordCount);
    // var friendship = this.model.get('id');
    challenges.fetch()
    console.log(challenges);
    console.log(friendship);
  },

  getChallenge: function(){
      console.log('prompt render');

      var writingPrompts = new app.WritingPromptCollection();

      var promptPainter = new app.WritingPromptListView({
        collection: writingPrompts,
        el: $('#challenge-container')
      });

      writingPrompts.fetch();

    },
    bindSubmit: function(){
        var scope = this;

        $('form#create-challenge').on('submit', function(e){
          e.preventDefault();
          var newChallenge = $('.prompt-text').html();
          var wordCount = $('#challenge-word-count').val();
          // var friendship = this.model.get()
          console.log(newChallenge);
          console.log(wordCount);
          // console.log(app.token);
          scope.createChallenge(newChallenge, wordCount);
          // app.challenges.url = '/friendships/:id/challenges'
          // app.posts.create({message: newMessage, prompt: prompt, word_count: wordCount, prompt_type: type},{wait:true});
        });
    },
    // checkCharacterCount: function(){
    //   this.characters = $('textarea#post-body').val().length;
    //   $('.character-count').html( this.characters );
    // },
    bindSlider: function(){
      $( "#slider-challenge-word-count" ).slider({
           range: "min",
           min: 50,
           max: 500,
           step: 50,
           slide: function( event, ui ) {
                $( "#word-count" ).html( ui.value );
                $("#challenge-word-count").val(ui.value);
           }
      });
    }

});
