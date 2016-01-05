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
    var votes = this.model.get("total_votes");

    this.$el.find("#resource-votes").html( votes );
    var $profilePic = $('<img>').attr("src", this.model.get('user_image')).addClass('resource-profile-picture img-circle');

    // Show Edit and Delete if the User Posted it
    if( this.model.get('user_id') === parseInt($('#current_id').val()) ){
      var $editButton = $("<span>").addClass("edit-resource").html("Edit");
      var $deleteButton = $("<span>").addClass("delete-resource").html("Delete");
      this.$el.find("#resource-controls").append($editButton, " ", $deleteButton);
    }


    this.$el.find("#resource-user-info").append("Submitted by ", $profilePic, this.model.get('submitted_by') );


  },
  events:{
    'click span.edit-resource': "renderEdit",
    'click span.submit-edited-resource': "editResource",
    'click span.delete-resource': "deleteResource",

    'click .resource-up-vote': 'upVote',
    'click .resource-down-vote': 'downVote'
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

    deleteResource: function(){
      console.log('delete critique clicked');

      var urlModel = "/api/writing_tips/" + this.model.get('id');
      this.model.destroy({url: urlModel});
      this.$el.remove();
    },

    upVote: function(){
      console.log('upvoting');
      var resourceId = this.model.get('id');
      var rating = 1;

      var urlModel = "/api/writing_tips/" + resourceId + '/tip_votes';

      var newVote = new app.TipVote({url: urlModel});
      newVote.url = urlModel;
      newVote.set('value', rating);

      newVote.save();

      this.model.fetch({url: urlModel})
      this.render();
    },

    downVote: function(){
      console.log('downvoting');
      var resourceId = this.model.get('id');
      var rating = -1;

      var urlModel = "/api/writing_tips/" + resourceId + '/tip_votes';

      var newVote = new app.TipVote({url: urlModel});
      newVote.url = urlModel;
      newVote.set('value', rating);

      newVote.save();

      this.model.fetch({url: urlModel})
      this.render();
    },


});
