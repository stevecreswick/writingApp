class Critique < ActiveRecord::Base

  belongs_to :post
  has_many :votes

end
