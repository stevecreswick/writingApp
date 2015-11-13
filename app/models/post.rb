class Post < ActiveRecord::Base

  belongs_to :user
  has_many :critiques

  has_many :ratings
  has_many :raters, :through => :ratings, :source => :users

  def average_rating
    @value = 0
    self.ratings.each do |rating|
        @value = @value + rating.value
    end
    @total = self.ratings.size
    @value.to_f / @total.to_f
  end

end
