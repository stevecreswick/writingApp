var app = app || {};

app.AcceptChallengeFormView = Backbone.View.extend({
  tagName: 'div',
  className: 'challenge-form',
  template: _.template( $('#accept-challenge-form-template').html() ),
  initialize: function(){
    console.log(this.model);
  },
  render: function(){
    this.$el.empty();
    var html = this.template();
    var $html = $( html );
    this.$el.append( $html );
    var wordCount = this.model.get('word_count');
    var prompt = this.model.get('prompt');
    var promptType = this.model.get('prompt_type');
    console.log(promptType);
    this.$('#challenge-container').html(prompt);
    this.$('#challenge-word-count').html(wordCount)
    console.log('word count in render ' + wordCount);
    this.renderEditor();
    this.bindSubmit(prompt, wordCount);
  },
  events:{
    'keyup': 'checkChallengeCharacterCount'
  },
  bindSubmit: function(prompt, wordCount){
      var scope = this;

      $('form#challenge-accept-form').on('submit', function(e){
        e.preventDefault();
        var newMessage = scope.$('#challenge-editor').first().eq(0).html()
        var urlModel = '/api/friendships/' + scope.model.get('friendship_id') + '/challenges/' + scope.model.get('id');
        scope.model.url = urlModel
        var message = scope.$('#challenge-editor').find('.ql-editor').text();
        var messageLength = message.length;

        console.log('message length ' + messageLength);
        console.log('word count '+ wordCount);
        if (messageLength >= wordCount) {
          console.log('longer than word count');
          scope.model.set({'message': newMessage, 'status': 'Accepted'});
          scope.model.save();
        } else {
          console.log('not longer than wc');
          scope.$('#challenge-error').text('not long enough');

        }

        // app.pagePainter.renderPosts();
        // app.pagePainter.renderPromptForm();
      });
  },
  checkChallengeCharacterCount: function(){
    this.characters = $('#challenge-editor').find('.ql-editor').text().length;
    console.log(this.characters);
    $('#current-challenge-word-count').html( this.characters );
  },
  renderEditor: function(){
    console.log('rendering editor!!');
    var fullEditor = new Quill('#challenge-editor', {
      modules: {
          'toolbar': { container: '#full-toolbar' },
          'link-tooltip': true
      },
      theme: 'snow'
    });
  }

});
