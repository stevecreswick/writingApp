// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require bootstrap.min
//= require material.min
//= require ripples.min

//= require quill.min



console.log('application manifest');

var welcome = welcome || {};


welcome.renderEditor = function(){
  var fullEditor = new Quill('#welcome-post-editor', {
    theme: 'snow'
  });
}



welcome.bindPost = function(){

$('#welcome-post-editor').on("keyup", function(){
  $('.posted-message').html( $(this).find('.ql-editor').html() );

});

};
//
// welcome.hoverHearts = function(){
//
// var scope = this;
//
// $( ".new-rating i" ).hover(
//   function() {
//     var parent = $(this).parent();
//
//     var value = parent.data("value");
//     var skill = parent.data("skill");
//
//     if ( $(this).hasClass('rated') ) {
//     } else {
//       scope.colorHearts(value, skill);
//     }
//
//   }, function() {
//     var parent = $(this).parent();
//
//     var value = parent.data("value");
//     var skill = parent.data("skill");
//
//     if ( $(this).hasClass('rated') ) {
//     } else {
//       scope.removeColor(value, skill);
//     }
//
//
//   });
//
//
// }
//
//
// welcome.colorHearts = function(rating, skill){
//
//   for (var i = 0; i <= rating; i++) {
//     var divId = "#rating-" + skill + "-" + i;
//
//       $(divId).find("i").addClass("fa-heart");
//       $(divId).find("i").removeClass( "fa-heart-o" );
//
//   }
// };
//
// welcome.removeColor = function(rating, skill){
//
//   for (var i = 0; i <= rating; i++) {
//     var divId = "#rating-" + skill + "-" + i;
//
//     $(divId).find("i").removeClass("fa-heart");
//     $(divId).find("i").addClass( "fa-heart-o" );
//
//
//   }
// };
//
welcome.checkWordCount = function(){
  welcome.wordCount = 0;
  $('#welcome-post-editor').on('keyup', function(){
    var text = $(this).find('.ql-editor').text();
    welcome.wordCount = text.match(/\S+/g).length;
    welcome.updateStatus(welcome.wordCount);

  });
};

welcome.updateStatus = function(wordCount){

    var progress = Math.floor( (wordCount / 25) * 100 ) + "%";

    $('.progress-bar').css({"width": progress});
};




$( document ).ready(function(){

  welcome.renderEditor();
  welcome.bindPost();
  // welcome.hoverHearts();
  welcome.checkWordCount();


  $.material.init();



});
