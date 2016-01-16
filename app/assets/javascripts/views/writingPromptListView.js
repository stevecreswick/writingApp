
var app = app || {};

app.WritingPromptListView = Backbone.View.extend({
  initialize: function(){
    this.listenTo(this.collection, 'add', this.render);
  },

  events: {
      'click .view-more-prompts': 'viewMore',
      'click .view-previous-prompts': "viewPrevious"
  },

  render: function(){
    this.$el.empty();

      var prompts = this.collection.models;
      var view;
        for (var i = 0; i < prompts.length; i++) {

          if (prompts[i].get('approved') === false) {
            view = new app.SubmittedPromptView({model: prompts[i]});
          } else {
            view = new app.WritingPromptView({model: prompts[i]});
          }

        // var poster = new app.User();
        // poster.fetch({url: "/users/show/" + prompts[i].get("submitted_by")}).done(function(){
        //     view.$el.find('.submitted-by').html( poster.get('username') );
        // });


        view.render();
        this.$el.append( view.$el );


        }
    },

    renderMore: function(){
      this.collection.url = "/api/prompts/page/" + app.pagePainter.currentPage;
      this.collection.fetch();

      var prompts = this.collection.models;
      for (var i = 0; i < prompts.length; i++) {
        view = new app.PromptView({model: prompts[i]});
        view.render();

        this.$el.append( view.$el );
      }
      this.renderButtons(prompts.length)


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
        var $more = $('<a>').addClass('view-more btn btn-raised btn-fab btn-info withripple').html("<i class='fa fa-angle-right'><div class='tiny-text'>Next</div></i>").attr("href", "javascript:void(0)");
        $col2.empty();
        $col2.append( $more );
      }

      // If it is not the first page,
      // add the previous button and page number
      if (app.pagePainter.currentPage > 0) {
        var $previous = $('<a>').addClass('view-previous btn btn-raised btn-fab btn-danger withripple').html("<i class='fa fa-angle-left'><div class='tiny-text'>Prev</div></i>").attr("href", "javascript:void(0)");
        $col1.empty();
        $col1.append( $previous );
      }

      $colCenter.html( "Page: " + (app.pagePainter.currentPage + 1) );

      $row.append( $col1, $colCenter, $col2 );

      this.$el.append( $row );

    }

});
