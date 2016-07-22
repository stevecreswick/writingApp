var app = app || {};

app.ResourcePageView = Backbone.View.extend({
  tagName: 'div',
  className: 'resource-page-view',
  template: _.template( $('#resource-page-template').html() ),
  resourceType: "all",

  initialize: function(){
    this.listenTo( this.model, 'change', this.render );

  },
  render: function(){
    app.pagePainter.currentPage = 0
    this.$el.empty();
    var html = this.template();
    var $html = $( html );
    this.$el.append( $html );

  },
  events:{
    'click #resource-submit': 'submitNewResource',
    'click span.delete-resource': 'deleteResource',
    'click .resource-sort': 'sortResources',
    'click .show-resource-form': 'showForm',
    'click .remove-form': 'removeForm'
  },

  sortResources: function(e){
    app.pagePainter.currentPage = 0

    this.$el.empty();
    this.render();

    var resourceType = $(e.currentTarget).eq(0).data('value');

    this.renderResources(resourceType);
  },

  showForm: function(){
    var $form = _.template( $('#resource-form-template').html() );
    this.$el.find("#resource-form-holder").empty();
    this.$el.find("#resource-form-holder").append( $form );

  },

  removeForm: function(){
    this.$el.find("#resource-form-holder").empty();

  },

  submitNewResource: function(){
    var name = this.$el.find("#resource-name").val();
    var description = this.$el.find("#resource-description").val();
    var link = this.$el.find("#resource-link").val();
    var tags = this.$el.find("#resource-tags").val();
    var resourceType = this.$el.find("#choose-resource-type").val();

    console.log(resourceType);
    app.resources = new app.ResourcesCollection();

    app.resources.url = "/api/writing_tips";


    app.resources.create({
      title: name,
      description: description,
      link: link,
      tags: tags,
      resource_type: resourceType
    });

    this.$el.find("#resource-name").val("");
    this.$el.find("#resource-description").val("");
    this.$el.find("#resource-link").val("");
    this.$el.find("#resource-tags").val("");

    this.renderResources("all");
  },

  renderResources: function(type){
    app.resources = new app.ResourcesCollection();

    app.resourceList = new app.ResourceListView({
      collection: app.resources,
      el: $("#resource-list")
    });

    var urlModel = "/api/writing_tips/sorted/" + type + "/" + app.pagePainter.currentPage;

    app.resources.fetch({url: urlModel, wait:true}).done(function(){
      app.resourceList.render();
    });

  },





});
