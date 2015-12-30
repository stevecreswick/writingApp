module Api::PostsHelper

  def current_api_user!
    if token = params[:token] || env['HTTP_TOKEN']
      @current_user = User.find_by(token: token)
    else
      render json: {status => 401}
    end
  end

  def rating_ballot
    if @rating = current_user.ratings.find_by_post_id(params[:id])
        @rating
    else
        current_user.ratings.new
    end
  end


  def friend_posts
    # Still worker
    friend_posts = []

    current_user.friends.each do |friend|

      friend.posts.each do |post|
      friend_posts.push( post )
      end

    end

    return friend_posts

  end

  def main_feed
    # Still worker
    @main_feed = []

    # main_feed.push(current_user.posts)

    current_user.friends.each do |friend|

      friend.posts.each do |post|
      @main_feed.push( post )
      end

    end

    current_user.posts.each do |post|

      @main_feed.push( post )

    end

    return @main_feed

  end


end
