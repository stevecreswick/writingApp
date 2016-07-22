class Post < ActiveRecord::Base

  belongs_to :user
  has_many :critiques

  has_many :ratings
  # has_many :raters, :through => :ratings, :foreign_key => :user_id

  # Feed Length
  self.per_page = 20

  # Ratings
  def average_rating
    @value = 0
    @total = 0

    if (self.ratings.length > 0)

      self.ratings.each do |rating|
        if rating.skill == "overall"
          @value = @value + rating.value
          @total += 1
        end
      end

      @value = ( @value.to_f / @total.to_f )
    end
  end

  def update_avg_rating
    @value = 0
    @total = 0

    if (self.ratings.length > 0)

      self.ratings.each do |rating|
        if rating.skill == "overall"
          @value = @value + rating.value
          @total += 1
        end
      end

      @value = ( @value.to_f / @total.to_f )
    end
    puts '************'
    puts '************'
    puts  '!!!! Updating  !!!!'
    puts '************'
    puts '************'

    self.update( {
      avg_rating: @value
    } )

    return @value
  end

  # def update_avg_skill_rating( skill )
  #   @value = 0
  #
  #   self.ratings.each do |rating|
  #     if skill == rating.skill
  #       @value = @value + rating.value
  #       @total += 1
  #     end
  #   end
  #
  #   @skill_rating = ( @value.to_f / @total.to_f )
  # end

  def skill_rating( skill )
    @skill_rating = 0

  self.ratings.each do |rating|
    if skill == rating.skill
      @skill_rating = @skill_rating + rating.value
    end
  end

  @skill_rating
  end
end
