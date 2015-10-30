
var app = app || {};

app.PostListView = Backbone.View.extend({
  initialize: function(){
    this.listenTo(this.collection, 'add', this.render);
  },
  render: function(){
    this.$el.empty();

    var $postListHeader = _.template( $('#post-list-menu').html() )
    this.$el.append($postListHeader);
      var posts = this.collection.models;
      var view;
        for (var i = 0; i < posts.length; i++) {
          view = new app.PostView({model: posts[i]});

          //Appends the Username to each Div
          view.renderWithUserName();

          // Append the View to the Post List
          this.$el.append( view.$el );
        }
    },
    currentClass: 'all-posts',
    events: {
      'click a.all-sort': 'getAll',
      'click a.fiction-sort': 'sortFiction',
      'click a.fantasy-sort': 'sortFantasy',
      'click a.horror-sort': 'sortHorror',
      'click a.thriller-sort': 'sortThriller',
      'click a.crime-sort': 'sortCrime',
      'click a.romance-sort': 'sortRomance',
      'click a.sci-fi-sort': 'sortSciFi',
      'click a.non-fiction-sort': 'sortNonFiction'
    },
    getAll: function(){
      this.collection.fetch({url: '/api/posts', wait:true});
      var div = $('div.container-fluid').eq(1);
      div.removeClass(this.currentClass);
      this.currentClass = "all-posts";
      div.addClass(this.currentClass);
      this.render();
    },
    sortFiction: function(){
      console.log('clicked sort fiction');
      var urlModel = '/api/posts/sorted/Fiction';
      this.collection.fetch({url: urlModel, wait:true});

      var div = $('div.container-fluid').eq(1);
      div.removeClass(this.currentClass);
      this.currentClass = "fiction";
      div.addClass(this.currentClass);

      this.render();
    },
    sortFantasy: function(){
      console.log('clicked sort fiction');
      var urlModel = '/api/posts/sorted/Fantasy';

      var div = $('div.container-fluid').eq(1);
      div.removeClass(this.currentClass);
      this.currentClass = "fantasy";
      div.addClass(this.currentClass);

      this.collection.fetch({url: urlModel, wait:true});
      this.render();
    },
    sortHorror: function(){
      console.log('clicked sort fiction');
      var urlModel = '/api/posts/sorted/Horror';

      var div = $('div.container-fluid').eq(1);
      div.removeClass(this.currentClass);
      this.currentClass = "horror";
      div.addClass(this.currentClass);

      this.collection.fetch({url: urlModel, wait:true});
      this.render();
    },
    sortThriller: function(){
      console.log('clicked sort fiction');
      var urlModel = '/api/posts/sorted/Thriller';

      var div = $('div.container-fluid').eq(1);
      div.removeClass(this.currentClass);
      this.currentClass = "thriller";
      div.addClass(this.currentClass);

      this.collection.fetch({url: urlModel, wait:true});
      this.render();
    },
    sortCrime: function(){
      console.log('clicked sort fiction');
      var urlModel = '/api/posts/sorted/Crime';

      var div = $('div.container-fluid').eq(1);
      div.removeClass(this.currentClass);
      this.currentClass = "crime";
      div.addClass(this.currentClass);

      this.collection.fetch({url: urlModel, wait:true});
      this.render();
    },
    sortRomance: function(){
      console.log('clicked sort fiction');
      var urlModel = '/api/posts/sorted/Romance';

      var div = $('div.container-fluid').eq(1);
      div.removeClass(this.currentClass);
      this.currentClass = "romance";
      div.addClass(this.currentClass);

      this.collection.fetch({url: urlModel, wait:true});
      this.render();
    },
    sortSciFi: function(){
      console.log('clicked sort scifi');

      var div = $('div.container-fluid').eq(1);
      div.removeClass(this.currentClass);
      this.currentClass = "sci-fi";
      div.addClass(this.currentClass);
      // div.css({'backgroundImage': "url('stardust.png')"});
      var urlModel = '/api/posts/sorted/Science-Fiction';
      this.collection.fetch({url: urlModel, wait:true});
      this.render();
    },
    sortNonFiction: function(){
      console.log('clicked sort fiction');
      var urlModel = '/api/posts/sorted/Non-Fiction';

      var div = $('div.container-fluid').eq(1);
      div.removeClass(this.currentClass);
      this.currentClass = "non-fiction";
      div.addClass(this.currentClass);

      this.collection.fetch({url: urlModel, wait:true});
      this.render();
    },
});
