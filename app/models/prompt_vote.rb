class PromptVote < ActiveRecord::Base

  belongs_to :writing_prompt
  belongs_to :user

end
