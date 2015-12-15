
var app = app || {};

app.PostListView = Backbone.View.extend({
  initialize: function(){
    this.listenTo(this.collection, 'add', this.render);
  },

  events: {
    'click span.view-more': 'viewMore',
    'click span.view-previous': "viewPrevious"
  },
  render: function(){
    this.$el.empty();

      var posts = this.collection.models;
      var view;
        for (var i = 0; i < posts.length; i++) {
          view = new app.PostView({model: posts[i]});
          //Appends the Username to each Div
          view.renderWithUserName();

          // Append the View to the Post List
          this.$el.append( view.$el );
        }

        var $row = $('<div>').addClass("row");
        var $col1 = $('<div>').addClass("col-xs-4 text-left previous");
        var $colCenter = $('<div>').addClass("col-xs-4 text-center");
        var $col2 = $('<div>').addClass("col-xs-4 text-right");

        var $more = $('<span>').addClass('view-more').text('Next');
        var $previous = $('<span>').addClass('view-previous').text('Previous');


        // If it is not the first page,
        // add the previous button and page number
        if (app.pagePainter.currentPage > 0) {
          $col1.empty();
          $col1.append( $previous );
          $colCenter.html( "Page: " + (app.pagePainter.currentPage + 1) );
        }

        $col2.append( $more );

        $row.append( $col1, $colCenter, $col2 );

        this.$el.append( $row );

    },

    renderMore: function(){
      this.collection.url = "/api/posts/paginated/" + app.pagePainter.currentGenre + "/" + app.pagePainter.currentPage;
      this.collection.fetch();

      var posts = this.collection.models;
      for (var i = (app.pagePainter.currentPage * 5); i < posts.length; i++) {
        view = new app.PostView({model: posts[i]});
        //Appends the Username to each Div
        view.renderWithUserName();

        // Append the View to the Post List
        this.$el.append( view.$el );
      }

      // var $more = $('<span>').addClass('view-more').text('View More');
      // this.$el.append( $more );

    },

    viewMore: function(){
      app.pagePainter.currentPage = app.pagePainter.currentPage + 1;
      this.renderMore();

    },

    viewPrevious: function(){
      if (app.pagePainter.currentPage > 0) {
        app.pagePainter.currentPage = app.pagePainter.currentPage - 1;
        this.renderMore();
      } else {
      }
    }


});
