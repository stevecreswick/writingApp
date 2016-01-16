class WritingPrompt < ActiveRecord::Base

  has_many :prompt_votes

end
