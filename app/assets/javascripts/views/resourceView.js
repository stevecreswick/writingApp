var app = app || {};

app.ResourceView = Backbone.View.extend({
  tagName: 'div',
  className: 'resource-view',
  template: _.template( $('#resource-view-template').html() ),
  initialize: function(){
  },
  render: function(){
    this.$el.empty();
    var html = this.template( this.model.toJSON() );
    var $html = $( html );
    this.$el.append( $html );
  },
  events:{
    'click span.edit-resource': "renderEdit",
    'click span.submit-edited-resource': "editResource"
  },

  renderEdit: function(){
    this.$el.empty();
    var $edit = _.template( $("#edit-resource-template").html() );

    this.$el.append( $edit );

    var name = this.$el.find("#edit-resource-title").val( this.model.get("title") );
    var description = this.$el.find("#edit-resource-description").val( this.model.get("description") );
    var link = this.$el.find("#edit-resource-link").val( this.model.get("link") );
    var tags = this.$el.find("#edit-resource-tags").val( this.model.get("tags") );

  },

  editResource: function(){
    var name = this.$el.find("#edit-resource-title").val();
    var description = this.$el.find("#edit-resource-description").val();
    var link = this.$el.find("#edit-resource-link").val();
    var tags = this.$el.find("#edit-resource-tags").val();

    var urlModel = "/api/writing_tips/" + this.model.get("id");

    this.model.set({
      "title": name,
      "description": description,
      "link": link,
      "tags": tags
    });

    this.model.url = urlModel
    this.model.save();
    this.render();




    },



});
