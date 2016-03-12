class Post < ActiveRecord::Base

  belongs_to :user
  has_many :critiques

  has_many :ratings
  # has_many :raters, :through => :ratings, :foreign_key => :user_id

  self.per_page = 20

  def average_rating
    @value = 0
    @total = 0

    if (self.ratings.length > 0)

      self.ratings.each do |rating|

        if rating.skill == "overall"
          puts "#{rating.skill} *******"
          @value = @value + rating.value
          @total += 1
        end

      end

      @value = (@value.to_f / @total.to_f)

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
