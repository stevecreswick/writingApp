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
//= require bootstrap-slider
//= require jquery.rating.pack.js

//= require quill.min

//= require models/writingPrompt
//= require views/writingPromptView
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

//= require models/user
//= require views/userView
//= require collections/userCollection
//= require views/userListView

//= require views/followerView
//= require collections/followerCollection
//= require views/followerListView

//= require models/challenge
//= require views/challengeView
//= require collections/challengeCollection
//= require collections/receivedChallengeCollection
//= require views/challengeListView
//= require views/completedChallengeView
//= require views/completedChallengeListView
//= require views/receivedChallengeView
//= require views/receivedChallengeListView

//= require models/rating


//= require views/promptFormView
//= require views/challengeFormView
//= require views/acceptChallengeFormView
//= require views/pageView

//= require timer
//= require app
//= require_self


console.log('main manifest');
