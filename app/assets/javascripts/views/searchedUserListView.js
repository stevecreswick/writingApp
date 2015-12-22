var app = app || {};

app.SearchedUserListView = Backbone.View.extend({
  initialize: function(){
    this.listenTo(this.collection, 'add', this.render);
  },

  events: {
    'click span.view-more-users': 'moreUsers',
    'click span.view-previous-users': 'previousUsers'
  },
  render: function(){
    this.$el.empty();

      var users = this.collection.models;
      var view;
        for (var i = 0; i < users.length; i++) {

          // If the user is a friend, do not render
          if (!users[i].get('is_friend')){
            view = new app.FriendView({model: users[i]});
            view.render();
            this.$el.append( view.$el );
          }
          else {
            console.log('user is friend');
          }


        }

        var $row = $('<div>').addClass("row");
        var $col1 = $('<div>').addClass("col-xs-4 text-left previous");
        var $colCenter = $('<div>').addClass("col-xs-4 text-center");
        var $col2 = $('<div>').addClass("col-xs-4 text-right");

        var $more = $('<span>').addClass('view-more-users').text('Next');
        var $previous = $('<span>').addClass('view-previous-users').text('Previous');


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
      this.collection.url = "/users/search/" + app.pagePainter.searchTerm + "/" + app.pagePainter.currentPage;
      this.collection.fetch();

      var users = this.collection.models;
      for (var i = 0; i < users.length; i++) {
        view = new app.FriendView({model: users[i]});
        //Appends the Username to each Div
        view.render();

        // Append the View to the Post List
        this.$el.append( view.$el );
      }

      // var $more = $('<span>').addClass('view-more').text('View More');
      // this.$el.append( $more );

    },

    moreUsers: function(){
      app.pagePainter.currentPage = app.pagePainter.currentPage + 1;
      this.renderMore();

    },

    previousUsers: function(){
      if (app.pagePainter.currentPage > 0) {
        app.pagePainter.currentPage = app.pagePainter.currentPage - 1;
        this.renderMore();
      } else {
      }
    }
});
