var app = app || {};

app.CompletedChallengeView = Backbone.View.extend({
  tagName: 'div',
  className: 'completed-challenge-view',
  template: _.template($('#completed-challenge-template').html()),

  initialize: function() {
    this.listenTo(this.model, 'change', this.render);
  },

  events: {
    'click .respond': 'submitResponse'
  },

  render: function() {
    this.$el.empty();
    var html = this.template(this.model.toJSON());
    var $html = $(html);
    this.$el.append($html);
    console.log(this.model.get('status'));
    var senderId = this.model.get("sender_id");
    var userId = parseInt( $("#current_id").val() );

    if (( this.model.get('status') === "Accepted" ) && ( senderId === userId )) {
      this.bindWordCount();
    } else if ( this.model.get('status') === "Completed" ) {
      this.showResponse();
    }

  },

  renderForm: function() {
    var $responseForm = _.template($("#response-form-template").html());
    this.$el.find('#response-holder').append($responseForm)
  },

  showResponse: function(){
    var $response = _.template($("#challenge-response-template").html());
    this.$el.find('#response-holder').append($response);
    this.$el.find("#response").html( this.model.get("response") )
  },

  submitResponse: function() {
    var newMessage = this.$el.find('#response-form').val();

    var urlModel = '/api/friendships/' + this.model.get('friendship_id') + '/challenges/' + this.model.get('id');

    console.log(urlModel);
    console.log(newMessage);
    // var message = scope.$('#challenge-editor').find('.ql-editor').text();
    var messageLength = newMessage.length;
    var wordCount = this.model.get("word_count");

    var urlModel = "/api/friendships/" + this.model.get("friendship_id") + "/challenges/" + this.model.get("id");

    if (messageLength >= wordCount) {
      this.model.url = urlModel;
      this.model.set({
        'response': newMessage,
        'status': 'Completed'
      });
      this.model.save();
      this.render();
    } else {
      this.$el.find('#challenge-response-error').text('not long enough');
    }
  },

  bindWordCount: function() {
    this.wordCount = 0;
    var scope = this;

    this.renderForm();


    this.$el.find("#response-form").on("keyup", function() {

      scope.wordCount = $(this).val().match(/\S+/g).length;

      scope.$el.find('#challenge-required-word-count').html(scope.wordCount);

    });

  }

});
