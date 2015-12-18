class Critique < ActiveRecord::Base

  belongs_to :post
  has_many :votes

  self.per_page = 10

end
