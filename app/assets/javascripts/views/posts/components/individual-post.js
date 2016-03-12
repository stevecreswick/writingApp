var app = app || {};

app.IndividualPost = Backbone.View.extend( {
  tagName: 'div',
  className: 'post',
  template: _.template( $('#individual-post-template').html() ),

  initialize: function(){
    this.listenTo(this.collection, 'reset', this.render);
  },

  render: function(){
    this.$el.empty();
    this.$el.append( $( this.template( this.model.toJSON() ) ) );
  }
} );
