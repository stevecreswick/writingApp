
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
      console.log(posts.length);
      var view;
        for (var i = 0; i < posts.length; i++) {
          view = new app.PostView({model: posts[i]});
          //Appends the Username to each Div
          view.renderWithUserName();

          // Append the View to the Post List
          this.$el.append( view.$el );
        }

        var $row = $('<div>').addClass("row");
        var $col1 = $('<div>').addClass("col-xs-6 text-left previous");
        var $col2 = $('<div>').addClass("col-xs-6 text-right");
        var $more = $('<span>').addClass('view-more').text('Next');
        var $previous = $('<span>').addClass('view-previous').text('Previous');


        if (app.pagePainter.currentPage > 0) {
          $col1.empty();
          $col1.append( $previous );
        }
        $col2.append( $more );

        $row.append( $col1, $col2 );

        this.$el.append( $row );

    },

    renderMore: function(){
      this.collection.url = "/api/posts/paginated/" + app.pagePainter.currentGenre + "/" + app.pagePainter.currentPage;
      this.collection.fetch();

      var posts = this.collection.models;
      console.log(posts);
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
        console.log('yolo');
      }
    }


});
