var app = {};
app.token = document.getElementById( 'api-token' ).value;

$.ajaxSetup({
  headers:{
    "accept": "application/json",
    "token": app.token
  }
});
