module Api::Posts::Ratings::RatingsHelper

  def already_rated( post, skill )
    rating = post.ratings.where( { skill: skill, user_id: current_user.id } ).last

    if rating
      return true
    else
      return false
    end
  end

  def update_rating
    @post = Post.last

    rating = @post.ratings.
                where( {
                  skill: 'overall',
                  user_id: current_user.id
                } ).last

    rating.update( {
      value: rating_params[ :value ]
    } );

    if rating.save
      @post.update_avg_rating
    end
  end

  def new_rating
    rating = Rating.create( rating_params )
    rating.update( {
      post_id: @post.id,
      user_id: current_user.id
    } );
  end
end
