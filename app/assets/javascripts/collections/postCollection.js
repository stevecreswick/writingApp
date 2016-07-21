var app = app || {};

app.PostCollection = Backbone.Collection.extend({
  model: app.Post,
  page: '1',
  endPoint: 'main',
  loadedModels: [],

  url: function( options ) {
      var genreQuery          =    '?genres=',
          promptQuery         =    '&?prompt=',
          lengthQuery      =       '&?length=';


    console.log('current page inside url function: ' + app.currentPage);
    console.log('this.page: ' + this.page );

    if (options) {

      // Set Genre
      if ( options.genres ) {
        for ( var i = 0; i < options.genres.length; i++ ) {
          if ( i === ( options.genres.length - 1 ) ) {
            genreQuery = genreQuery + options.genres[ i ];
          }
          else {
            genreQuery = genreQuery + ( options.genres[ i ] + ',' );
          }
        }
      }
      else {
        genreQuery = genreQuery + 'all';
      }

      // Set Prompt Search
      if ( options.prompt ) {
        promptQuery = promptQuery + options.prompt;
      }
      else {
        promptQuery = '';
      }

      // Set Post Length
      if ( options.length ) {
        lengthQuery = lengthQuery + options.length;
      }
      else {
        lengthQuery = '';
      }

      return "/api/posts/" + this.endPoint + "/" + this.page + genreQuery + promptQuery + lengthQuery;
    }

    return "/api/posts/" + this.endPoint + "/" + this.page;

  },

  urls: {
    'main': '/posts/main/' + this.page,
    // 'genre': '/posts/genre/' + this.endPoint + '/' + this.page,
    'newest': '/posts/newest/' + this.page,
    'topRated': '/posts/top_rated/' + this.page,
    'friends': '/posts/friends/' + this.page,
    'users': '/posts/users/'
  }
});
