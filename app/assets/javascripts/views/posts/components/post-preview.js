app.PostPreview = Backbone.View.extend({
  tagName: 'div',
  className: 'post-preview',
  template: _.template( $('#post-preview-template').html() ),

  render: function(){
    this.$el.empty();
    var html = this.template( this.model.toJSON() );
    console.log(this.model);

    this.$el.append( $html );

    var $html = $( html );
    this.$el.append( $html );
  }

});
