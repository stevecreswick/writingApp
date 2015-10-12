# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

json_nouns = JSON.parse ( File.read('db/seeds/nouns.json') )
nouns = json_nouns['nouns']
nouns.each do |noun|
  WritingPrompt.create({
      prompt: noun,
      prompt_type: 'One Word',
      model_url: 'one_word'
      })
end

json_what_ifs = JSON.parse ( File.read('db/seeds/what_ifs.json') )
what_ifs = json_what_ifs['what_ifs']
what_ifs.each do |what_if|
  WritingPrompt.create({
      prompt: what_if,
      prompt_type: 'What If',
      model_url: 'what_if'
      })
end

json_first_sentences = JSON.parse ( File.read('db/seeds/first_sentences.json') )
first_sentences = json_first_sentences['first_sentences']
first_sentences.each do |first_sentence|
  WritingPrompt.create({
      prompt: first_sentence,
      prompt_type: 'First Sentence',
      model_url: 'first_sentence'
      })
end
