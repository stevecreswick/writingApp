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
      prompt_type: 'One Word'
      })
end
