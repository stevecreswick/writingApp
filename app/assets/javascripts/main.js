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
//= require views/writingPromptView
//= require views/submittedPromptView
//= require collections/writingPromptCollection
//= require views/writingPromptListView

//= require models/critique
//= require views/critiqueView
//= require collections/critiqueCollection
//= require views/critiqueListView

//= require models/post
//= require views/postView
//= require collections/postCollection
//= require views/postListView

//= require models/friend
//= require views/friendView
//= require collections/friendCollection
//= require collections/pendingFriendCollection
//= require views/friendListView
//= require views/searchedUserListView


//= require models/user
//= require views/userView
//= require collections/userCollection
//= require views/userListView
//= require views/currentUserView


//= require views/followerView
//= require collections/followerCollection
//= require views/followerListView

//= require models/challenge
//= require views/challengeView
//= require views/acceptedChallengeView
//= require collections/challengeCollection
//= require collections/receivedChallengeCollection
//= require collections/completedChallengeCollection
//= require collections/sentChallengeCollection


//= require views/challengeListView
//= require views/completedChallengeView
//= require views/completedChallengeListView
//= require views/receivedChallengeView
//= require views/receivedChallengeListView
//= require views/sentChallengeListView


//= require models/rating
//= require models/vote
//= require models/tipVote
//= require models/promptVote
//= require collections/ratingsCollection



//= require models/resource
//= require collections/resourcesCollection
//= require views/resourceView
//= require views/resourceListView


//= require views/writing/components/writing-navbar
//= require views/writing/components/prompt-form
//= require views/writing/components/editor
//= require views/writing/components/post-info

//= require views/writing/writingPage



//= require views/challengeFormView
//= require views/acceptChallengeFormView
//= require views/resourcePageView
//= require views/pageView

//= require app
//= require_self




console.log('main manifest');
