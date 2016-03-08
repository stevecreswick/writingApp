var app = app || {};

app.SubmittedPromptView = Backbone.View.extend({
  tagName: 'div',
  className: 'writing-prompt',
  template: _.template( $('#submitted-prompt-template').html() ),
  initialize: function(){

  },
  render: function(){
    this.$el.empty();
    var html = this.template( this.model.toJSON() );
    var $html = $( html );
    var scope = this;
    var poster = new app.User();

    poster.fetch({url: "/users/show/" + this.model.get('submitted_by')}).done(function(){
        $($html[0]).html( poster.get('username') );
        scope.$el.append( $html );
        var votes = scope.model.get('total_votes');
    });
  },

  events: {
    'click .up-vote-prompt': 'upVote',
    'click .down-vote-prompt': 'downVote',
    'click .reject-prompt': 'rejectPrompt',
    'click .accept-prompt': 'acceptPrompt'

  },

  rejectPrompt: function(){
    this.model.url = "/api/writing_prompts/" + this.model.get('id');

    this.model.destroy();
    this.$el.remove();
  },

  acceptPrompt: function(){

    console.log('accepting prompt');

    // Create post route
    // create route to update the writing prompt

  },

  upVote: function(){
    var scope = this;
    console.log('upvote clicked...');
    var promptId = this.model.get('id');
    console.log(promptId);

    var rating = 1;

    var urlModel = "/api/writing_prompts/" + promptId + "/prompt_votes";

    var newVote = new app.PromptVote({url: urlModel});
    newVote.url = urlModel;
    newVote.set('value', rating);

    newVote.save();

    var promptUrl = "/api/writing_prompts/show/" + promptId;
    this.model.fetch({url: promptUrl}).done(function(){
      scope.render();
    });
  },

  downVote: function(){
    console.log('downvote clicked...');

    var promptId = this.model.get('id');

    var rating = -1;

    var urlModel = "/api/writing_prompts/" + promptId + "/prompt_votes";

    var newVote = new app.PromptVote({url: urlModel});
    newVote.url = urlModel;
    newVote.set('value', rating);

    newVote.save();
    var promptUrl = "/api/writing_prompts/show/" + promptId;
    this.model.fetch({url: promptUrl})
    this.render();
  }

});
