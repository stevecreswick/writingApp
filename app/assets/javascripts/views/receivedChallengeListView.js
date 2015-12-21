var app = app || {};

app.ReceivedChallengeListView = Backbone.View.extend({
  initialize: function() {
    this.listenTo(this.collection, 'add', this.render);
  },

  events: {
    'click span.view-more-received-challenges': 'viewMore',
    'click span.view-previous-received-challenges': "viewPrevious"
  },

  render: function(){
    console.log('received challenges rendering');
    this.$el.empty();
    var $challengesHeader = $('<h1>').text('Received Challenges');
    this.$el.append($challengesHeader);

    var username = $('#current_id').val();

      var challenges = this.collection.models;

      var receivedChallenges = challenges.filter(function (challenge) {
        return challenge.sender !== username;
      });

      var view;

        for (var i = 0; i < receivedChallenges.length; i++) {
                // if (receivedChallenges[i].get('status') === 'Accepted') {
                  // console.log('Accepted Challenge');
                //   view = new app.CompletedChallengeView({model: receivedChallenges[i]});
                // } else {
                //   console.log('Open Challenge');
                  view = new app.ReceivedChallengeView({model: receivedChallenges[i]});
                // }

                view.render();
                this.$el.append( view.$el );

          }

          var $row = $('<div>').addClass("row");

          var $col1 = $('<div>').addClass("col-xs-4 text-left previous");
          var $colCenter = $('<div>').addClass("col-xs-4 text-center");
          var $col2 = $('<div>').addClass("col-xs-4 text-right");

          var $more = $('<span>').addClass('view-more-received-challenges').text('Next');
          var $previous = $('<span>').addClass('view-previous-received-challenges').text('Previous');


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
    var urlModel = "/api/challenges/received/" + app.pagePainter.currentPage;

    var receivedChallenges = new app.ReceivedChallengeCollection();

    var receivedChallengesPainter = new app.ReceivedChallengeListView({
      collection: receivedChallenges,
      el: $('#challenge-page')
    });

    receivedChallenges.fetch({url: urlModel});

      // Append the View to the Post List
      this.$el.append( view.$el );
    },

    // var $more = $('<span>').addClass('view-more').text('View More');
    // this.$el.append( $more );


  moreReceivedChallenges: function(){
    app.pagePainter.currentPage = app.pagePainter.currentPage + 1;
    this.renderMore();

  },

  previousReceivedChallenges: function(){
    if (app.pagePainter.currentPage > 0) {
      app.pagePainter.currentPage = app.pagePainter.currentPage - 1;
      this.renderMore();
    } else {
    }
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



// var username = $('li#username').html()
// console.log(username);

// if (challenges[i].get('sender') !== username ){
// we want it to render as Received
// } else if (challenges[i].get('sender') === username ) {
// we want it to render a Sent View
// }
