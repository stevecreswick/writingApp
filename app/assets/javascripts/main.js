// This is a manifest file that'll be compiled into users.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require jquery-ui.min

//= require underscore
//= require backbone
//= require backbone-relational
//= require backbone.pagedcollection
//= require turbolinks
//= require bootstrap.min
//= require material.min
//= require ripples.min

//= require quill.min

//= require models/writingPrompt
//= require views/writing/writingPromptView
//= require views/writing/submittedPromptView
//= require collections/writingPromptCollection
//= require views/writing/writingPromptListView

//= require models/critique
//= require views/critiques/critiqueView
//= require collections/critiqueCollection
//= require views/critiques/critiqueListView

//= require models/post
//= require views/posts/postView
//= require collections/postCollection
//= require views/posts/postListView

//= require models/friend
//= require views/authors/friendView
//= require collections/friendCollection
//= require collections/pendingFriendCollection
//= require views/authors/friendListView
//= require views/authors/searchedUserListView


//= require models/user
//= require views/authors/userView
//= require collections/userCollection
//= require views/authors/userListView
//= require views/currentUserView


//= require views/authors/followerView
//= require collections/followerCollection
//= require views/authors/followerListView

//= require models/challenge
//= require views/challenges/challengeView
//= require views/challenges/acceptedChallengeView
//= require collections/challengeCollection
//= require collections/receivedChallengeCollection
//= require collections/completedChallengeCollection
//= require collections/sentChallengeCollection


//= require views/challenges/challengeListView
//= require views/challenges/completedChallengeView
//= require views/challenges/completedChallengeListView
//= require views/challenges/receivedChallengeView
//= require views/challenges/receivedChallengeListView
//= require views/challenges/sentChallengeListView


//= require models/rating
//= require models/vote
//= require models/tipVote
//= require models/promptVote
//= require collections/ratingsCollection



//= require models/resource
//= require collections/resourcesCollection
//= require views/resources/resourceView
//= require views/resources/resourceListView


//= require views/writing/components/writing-navbar
//= require views/writing/components/prompt-form
//= require views/writing/components/editor
//= require views/writing/writingPage



//= require views/challenges/challengeFormView
//= require views/challenges/acceptChallengeFormView

//= require views/resources/resourcePageView
//= require views/pageView

//= require app
//= require_self




console.log('main manifest');
