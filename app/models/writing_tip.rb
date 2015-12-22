class WritingTip < ActiveRecord::Base

  belongs_to :user
  has_many :tip_votes


def total_votes
  @total_votes = 0
  self.tip_votes.each do |vote|
    @total_votes += vote.value
  end
  @total_votes
end

end
