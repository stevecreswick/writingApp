var app = app || {};

app.ResourcePageView = Backbone.View.extend({
  tagName: 'div',
  className: 'resource-page-view',
  template: _.template( $('#resource-page-template').html() ),

  initialize: function(){
    this.listenTo( this.model, 'change', this.render );
  },
  render: function(){
    this.$el.empty();
    var html = this.template();
    var $html = $( html );
    this.$el.append( $html );
  },
  events:{
    'click #resource-submit': 'submitNewResource'
  },

  submitNewResource: function(){
    var name = this.$el.find("#resource-name").val();
    var description = this.$el.find("#resource-description").val();
    var link = this.$el.find("#resource-link").val();
    var tags = this.$el.find("#resource-tags").val();

    app.resources = new app.ResourcesCollection();


    app.resources.create({
      name: name,
      description: description,
      link: link,
      tags: tags
    });

    this.$el.find("#resource-name").val("");
    this.$el.find("#resource-description").val("");
    this.$el.find("#resource-link").val("");
    this.$el.find("#resource-tags").val("");

  }



});
