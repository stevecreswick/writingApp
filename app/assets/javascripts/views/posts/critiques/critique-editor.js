renderCritiqueEditor: function(){
  // var toolbarClass = '#full-toolbar' + this.model.get('id');
  // var editorClass = '#critique-editor' + this.model.get('id');

  var toolbarPost = this.$el.find('#full-toolbar').eq(0);
  var editorPost = this.$el.find('#critique-editor');

  var editorId = 'critique-editor-' + this.model.get("id");
  var $editor = $("<div>").attr("id", editorId).addClass('critique-editor').hide();
  var editorGrabber = "#" + editorId;

  var toolbarId = 'toolbar-' + this.model.get('id');
  this.$el.find('#full-toolbar').addClass( toolbarId );
  var toolbarGrabber = "." + toolbarId;

  this.$el.find('#critique-editor-holder').append( $editor );


  var fullEditor = new Quill(editorGrabber, {
    modules: {
        'toolbar': { container: toolbarGrabber },
        'link-tooltip': true
    },
    theme: 'snow'
  });

  $editor.show('normal');

}
