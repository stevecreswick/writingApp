class Post < ActiveRecord::Base

  belongs_to :user
  has_many :critiques

  has_many :ratings
  # has_many :raters, :through => :ratings, :foreign_key => :user_id

  self.per_page = 10

  def average_rating
    @value = 0

    if (self.ratings.length > 0)
      self.ratings.each do |rating|
          @value = @value + rating.value
      end
      @total = self.ratings.size
      @value.to_f / @total.to_f
    end

    return @value
    
  end

  def skill_rating(skill)
    @skill_rating = 0

    self.ratings.each do |rating|
      if skill == rating.skill
        @skill_rating = @skill_rating + rating.value
      end
    end

    @skill_rating
  end


end
