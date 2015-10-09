var app = app || {};

app.WritingPromptView = Backbone.View.extend({
  tagName: 'div',
  className: 'writing-prompt',
  template: _.template( $('#writing-prompt-template').html() ),
  initialize: function(){

  },
  render: function(){
    this.$el.empty();
    var html = this.template( this.model.toJSON() );
    var $html = $( html );
    this.$el.append( $html );
  }

});
