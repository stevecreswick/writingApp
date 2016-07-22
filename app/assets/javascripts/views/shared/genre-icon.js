var app = app || {};

app.GenreIcon = function( genre ) {
  this.genre = genre;
  this.url = function() {
    return this[ this.genre.toLowerCase() ];
  }
}

app.GenreIcon.prototype.fiction = 'http://i.imgur.com/BI8PegK.png';
app.GenreIcon.prototype.fantasy = 'http://i.imgur.com/ffCviDQ.png';
app.GenreIcon.prototype.horror = 'http://i.imgur.com/iJvfYS1.png';
app.GenreIcon.prototype.thriller = 'http://i.imgur.com/ojVa8BI.png';
app.GenreIcon.prototype.historical = 'http://i.imgur.com/lHyRvye.png';
app.GenreIcon.prototype.crime = 'http://i.imgur.com/8w44WhP.png';
app.GenreIcon.prototype.romance = 'http://i.imgur.com/zz5QHWN.png';
app.GenreIcon.prototype.scifi = 'http://i.imgur.com/K1kGfUE.png';
app.GenreIcon.prototype.poetry = 'http://i.imgur.com/F71bhWM.png';
app.GenreIcon.prototype.humor = 'http://i.imgur.com/Iw9CxT2.png';
app.GenreIcon.prototype.nonFiction = 'http://i.imgur.com/tH5XICv.png';
