var app = app || {};

app.RatingsListView = Backbone.View.extend({

  currentPage: 0,

  initialize: function() {
    this.listenTo( this.collection, 'add', this.render );
  },

  events: {

  },

  render: function(){
    this.$el.empty();
      var ratings = this.collection.models;
      var view;
      for ( var i = 0; i < ratings.length; i++ ) {
        view = new app.RatingView( { model: ratings[ i ] } );
        view.render();
        this.$el.append( view.$el );
      }
    },

});
