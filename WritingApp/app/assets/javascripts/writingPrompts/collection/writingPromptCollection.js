var app = app || {};

app.WritingPromptCollection = Backbone.Collection.extend({
  model: app.WritingPrompt,
  url: '/api/writing_prompts'
});
