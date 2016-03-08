var app = app || {};

app.Icon = function( genre ) {
  this.genre = genre;
  this.url = function() {
    return this[ this.genre.toLowerCase() ];
  }
}

app.Icon.prototype.fiction = 'http://i.imgur.com/BI8PegK.png';
app.Icon.prototype.fantasy = 'http://i.imgur.com/ffCviDQ.png';
app.Icon.prototype.horror = 'http://i.imgur.com/iJvfYS1.png';
app.Icon.prototype.thriller = 'http://i.imgur.com/ojVa8BI.png';
app.Icon.prototype.historical = 'http://i.imgur.com/lHyRvye.png';
app.Icon.prototype.crime = 'http://i.imgur.com/8w44WhP.png';
app.Icon.prototype.romance = 'http://i.imgur.com/zz5QHWN.png';
app.Icon.prototype.sciFi = 'http://i.imgur.com/K1kGfUE.png';
app.Icon.prototype.poetry = 'http://i.imgur.com/F71bhWM.png';
app.Icon.prototype.humor = 'http://i.imgur.com/Iw9CxT2.png';
app.Icon.prototype.nonFiction = 'http://i.imgur.com/tH5XICv.png';
