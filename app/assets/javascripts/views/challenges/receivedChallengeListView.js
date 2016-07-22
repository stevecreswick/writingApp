var app = app || {};

app.ReceivedChallengeListView = Backbone.View.extend({
  initialize: function() {
    this.listenTo(this.collection, 'add', this.render);
  },

  events: {
    'click .view-more-received-challenges': 'viewMore',
    'click .view-previous-received-challenges': "viewPrevious"
  },

  render: function(){
    console.log('received challenges rendering');
    this.$el.empty();
    // var $challengesHeader = $('<h1>').text('Received Challenges');
    // this.$el.append($challengesHeader);

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

          this.renderButtons(receivedChallenges.length)


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

      this.renderButtons(posts.length)

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

  renderButtons: function(length){
    var $row = $('<div>').addClass("row");
    var $col1 = $('<div>').addClass("col-xs-4 text-left previous");
    var $colCenter = $('<div>').addClass("col-xs-4 text-center");
    var $col2 = $('<div>').addClass("col-xs-4 text-right");


    if (length >= 10){
      var $more = $('<a>').addClass('view-more-received-challenges btn btn-raised btn-fab btn-info withripple').html("<i class='fa fa-angle-right'><div class='tiny-text'>Next</div></i>").attr("href", "javascript:void(0)");
      $col2.empty();
      $col2.append( $more );
    }

    // If it is not the first page,
    // add the previous button and page number
    if (app.pagePainter.currentPage > 0) {
      var $previous = $('<a>').addClass('view-previous-received-challenges btn btn-raised btn-fab btn-danger withripple').html("<i class='fa fa-angle-left'><div class='tiny-text'>Prev</div></i>").attr("href", "javascript:void(0)");
      $col1.empty();
      $col1.append( $previous );
    }

    $colCenter.html( "Page: " + (app.pagePainter.currentPage + 1) );

    $row.append( $col1, $colCenter, $col2 );

    this.$el.append( $row );

  }

});



// var username = $('li#username').html()
// console.log(username);

// if (challenges[i].get('sender') !== username ){
// we want it to render as Received
// } else if (challenges[i].get('sender') === username ) {
// we want it to render a Sent View
// }
