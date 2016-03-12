app.PostPreview = Backbone.View.extend({
  tagName: 'div',
  className: 'post-preview',
  template: _.template( $('#post-preview-template').html() ),

  render: function(){
    this.$el.empty();
    this.$el.append( $( this.template( this.model.toJSON() ) ) );
  }

});
