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

    this.renderResources();

  },
  events:{
    'click #resource-submit': 'submitNewResource',
    'click span.delete-resource': 'deleteResource'
  },

  submitNewResource: function(){
    var name = this.$el.find("#resource-name").val();
    var description = this.$el.find("#resource-description").val();
    var link = this.$el.find("#resource-link").val();
    var tags = this.$el.find("#resource-tags").val();

    app.resources = new app.ResourcesCollection();


    app.resources.create({
      title: name,
      description: description,
      link: link,
      tags: tags
    });

    this.$el.find("#resource-name").val("");
    this.$el.find("#resource-description").val("");
    this.$el.find("#resource-link").val("");
    this.$el.find("#resource-tags").val("");

    this.renderResources();
  },

  renderResources: function(){
    app.resources = new app.ResourcesCollection();

    app.resourceList = new app.ResourceListView({
      collection: app.resources,
      el: $("#resource-list")
    });

    app.resources.fetch({wait:true}).done(function(){
      console.log(app.resources);
      app.resourceList.render();
    });

  },





});
