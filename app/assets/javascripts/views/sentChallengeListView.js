var app = app || {};

app.SentChallengeListView = Backbone.View.extend({

  events: {
    'click .view-more-sent-challenges': 'viewMore',
    'click .view-previous-sent-challenges': "viewPrevious"
  },

  initialize: function() {
    this.listenTo(this.collection, 'add', this.render);
  },
  render: function(){
    this.$el.empty();
      var challenges = this.collection.models;
      var view;
        for (var i = 0; i < challenges.length; i++) {

          if (challenges[i].get('status') == 'Accepted'){
          view = new app.CompletedChallengeView({model: challenges[i]});
          } else {
          view = new app.ChallengeView({model: challenges[i]});
          view.render();
          this.$el.append( view.$el );
          }
        }


        this.renderButtons(challenges.length)


  },

  renderMore: function(){
    this.collection.url = "/api/challenges/sent/" + app.pagePainter.currentPage;
    this.collection.fetch();

    var sentChallenges = this.collection.models;
    for (var i = 0; i < sentChallenges.length; i++) {
      view = new app.FriendView({model: sentChallenges[i]});
      //Appends the Username to each Div
      view.render();

      // Append the View to the Post List
      this.$el.append( view.$el );
    }
    this.renderButtons(sentChallenges.length)
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
  },

  renderButtons(length){
    var $row = $('<div>').addClass("row");
    var $col1 = $('<div>').addClass("col-xs-4 text-left previous");
    var $colCenter = $('<div>').addClass("col-xs-4 text-center");
    var $col2 = $('<div>').addClass("col-xs-4 text-right");


    if (length >= 10){
      var $more = $('<a>').addClass('view-more-sent-challenges btn btn-raised btn-fab btn-info withripple').html("<i class='fa fa-angle-right'><div class='tiny-text'>Next</div></i>").attr("href", "javascript:void(0)");
      $col2.empty();
      $col2.append( $more );
    }

    // If it is not the first page,
    // add the previous button and page number
    if (app.pagePainter.currentPage > 0) {
      var $previous = $('<a>').addClass('view-previous-sent-challenges btn btn-raised btn-fab btn-danger withripple').html("<i class='fa fa-angle-left'><div class='tiny-text'>Prev</div></i>").attr("href", "javascript:void(0)");
      $col1.empty();
      $col1.append( $previous );
    }

    $colCenter.html( "Page: " + (app.pagePainter.currentPage + 1) );

    $row.append( $col1, $colCenter, $col2 );

    this.$el.append( $row );

  }


});
