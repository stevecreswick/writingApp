class Challenge < ActiveRecord::Base

  belongs_to :friendship

  self.per_page = 10

end
