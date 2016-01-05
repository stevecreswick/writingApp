
var app = app || {};

app.CritiqueListView = Backbone.View.extend({
  currentPage: 0,

  initialize: function() {
    this.listenTo(this.collection, 'add', this.render);
  },

  events: {
    'click .view-more-feedback': 'viewMore',
    'click .view-previous-feedback': "viewPrevious"
  },

  render: function(){
    this.$el.empty();
      var feedback = this.collection.models;

      var view;
        for (var i = 0; i < feedback.length; i++) {

          view = new app.CritiqueView({model: feedback[i]});
          view.render();

          this.$el.append( view.$el );

        }

        this.renderButtons(feedback.length)

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
      this.renderButtons(feedback.length)
      // var $more = $('<span>').addClass('view-more').text('View More');
      // this.$el.append( $more );

    },

    viewMore: function(){
      this.currentPage += 1;
      this.renderMore();

    },

    viewPrevious: function(){
      this.currentPage -= 1;
      this.renderMore();

    },

    renderButtons(length){
      var $row = $('<div>').addClass("row");
      var $col1 = $('<div>').addClass("col-xs-4 text-left previous");
      var $colCenter = $('<div>').addClass("col-xs-4 text-center");
      var $col2 = $('<div>').addClass("col-xs-4 text-right");


      if (length >= 10){
        var $more = $('<a>').addClass('view-more-feedback btn btn-raised btn-fab btn-info withripple').html("<i class='fa fa-angle-right'><div class='tiny-text'>Next</div></i>").attr("href", "javascript:void(0)");
        $col2.empty();
        $col2.append( $more );
      }

      // If it is not the first page,
      // add the previous button and page number
      if (this.currentPage > 0) {
        var $previous = $('<a>').addClass('view-previous-feedback btn btn-raised btn-fab btn-danger withripple').html("<i class='fa fa-angle-left'><div class='tiny-text'>Prev</div></i>").attr("href", "javascript:void(0)");
        $col1.empty();
        $col1.append( $previous );
      }

      $colCenter.html( "Page: " + (this.currentPage + 1) );

      $row.append( $col1, $colCenter, $col2 );

      this.$el.append( $row );

    }


});
