class Post < ActiveRecord::Base

  belongs_to :user
  has_many :critiques

  has_many :ratings
  # has_many :raters, :through => :ratings, :foreign_key => :user_id

  self.per_page = 10

  def average_rating
    @value = 0
    self.ratings.each do |rating|
        @value = @value + rating.value
    end
    @total = self.ratings.size
    @value.to_f / @total.to_f
  end


end
