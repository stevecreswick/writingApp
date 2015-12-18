
var app = app || {};

app.CritiqueListView = Backbone.View.extend({
  currentPage: 0,

  initialize: function() {
    this.listenTo(this.collection, 'add', this.render);
  },

  events: {
    'click span.view-more-feedback': 'viewMore',
    'click span.view-previous-feedback': "viewPrevious"
  },

  render: function(){
    this.$el.empty();
      var critiques = this.collection.models;

      var view;
        for (var i = 0; i < critiques.length; i++) {

          view = new app.CritiqueView({model: critiques[i]});
          view.render();

          this.$el.append( view.$el );

        }

      var $row = $('<div>').addClass("row");
      var $col1 = $('<div>').addClass("col-xs-4 text-left previous");
      var $colCenter = $('<div>').addClass("col-xs-4 text-center");
      var $col2 = $('<div>').addClass("col-xs-4 text-right");

      var $more = $('<span>').addClass('view-more-feedback').text('Next');
      var $previous = $('<span>').addClass('view-previous-feedback').text('Previous');

      if (this.currentPage > 0) {
        $col1.empty();
        $col1.append( $previous );
        $colCenter.html( "Page: " + (this.currentPage + 1) );
      }

      $col2.append( $more );

      $row.append( $col1, $colCenter, $col2 );

      this.$el.append( $row );


    },

    renderMore: function(){
      this.collection.url = "/api/posts/" + this.postId + "/critiques/page/" + this.currentPage;
      this.collection.fetch();

      var feedback = this.collection.models;
      for (var i = 0; i < feedback.length; i++) {
        view = new app.CritiqueView({model: feedback[i]});
        //Appends the Username to each Div
        view.render();

        // Append the View to the Post List
        this.$el.append( view.$el );
      }

      // var $more = $('<span>').addClass('view-more').text('View More');
      // this.$el.append( $more );

    },

    viewMore: function(){
      this.currentPage += 1;
      this.renderMore();

    },


});
