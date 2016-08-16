class WritingPrompt < ActiveRecord::Base


  has_many :prompt_votes
  has_many :posts
  belongs_to :user

end
