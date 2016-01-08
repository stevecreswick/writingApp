var app = app || {};

app.SearchedUserListView = Backbone.View.extend({
  initialize: function(){
    this.listenTo(this.collection, 'add', this.render);
  },

  events: {
    'click .view-more-users': 'moreUsers',
    'click .view-previous-users': 'previousUsers'
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

        this.renderButtons(users.length)


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
      this.renderButtons(users.length)
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
    },

    renderButtons: function(length){
      var $row = $('<div>').addClass("row");
      var $col1 = $('<div>').addClass("col-xs-4 text-left previous");
      var $colCenter = $('<div>').addClass("col-xs-4 text-center");
      var $col2 = $('<div>').addClass("col-xs-4 text-right");


      if (length >= 10){
        var $more = $('<a>').addClass('view-more-users btn btn-raised btn-fab btn-info withripple').html("<i class='fa fa-angle-right'><div class='tiny-text'>Next</div></i>").attr("href", "javascript:void(0)");
        $col2.empty();
        $col2.append( $more );
      }

      // If it is not the first page,
      // add the previous button and page number
      if (app.pagePainter.currentPage > 0) {
        var $previous = $('<a>').addClass('view-previous-users btn btn-raised btn-fab btn-danger withripple').html("<i class='fa fa-angle-left'><div class='tiny-text'>Prev</div></i>").attr("href", "javascript:void(0)");
        $col1.empty();
        $col1.append( $previous );
      }

      $colCenter.html( "Page: " + (app.pagePainter.currentPage + 1) );

      $row.append( $col1, $colCenter, $col2 );

      this.$el.append( $row );

    }

});
