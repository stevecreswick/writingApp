class TipVote < ActiveRecord::Base

  belongs_to :writing_tip
  belongs_to :user

end
