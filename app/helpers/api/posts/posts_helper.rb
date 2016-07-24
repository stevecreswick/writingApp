module Api::Posts::PostsHelper

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

# Fetch Posts
  def get_posts( end_point, genres, page )

    if end_point == 'all'
      @posts = Post.paginate(  :page => page  ).order( 'created_at ASC' )
    elsif end_point == 'user'
      @posts = current_user.posts.paginate( :page => page ).order( 'created_at DESC' )
    elsif end_point == 'main'
      @posts = main_feed.paginate( :page => page )
    else
      @posts = Post.paginate( :page => page )
    end

    @json_posts = @posts.map do |post|
      # apply_post_data( post )

      post_convertor( post )
    end

    return @json_posts
  end


  def post_convertor( post )
    json_post = {}
    json_post[ 'data' ]        =    post.as_json
    json_post[ 'author' ]      =    {}
    json_post[ 'reader' ]      =    {}
    json_post[ 'feedback' ]    =    {}

    # {
    #   post: {
          json_post[ 'data' ][ 'created_at_in_words' ] = time_ago_in_words( post.created_at )
    #   },
    #   author: {
    #     Author Stats
          json_post[ 'author' ][ 'username' ] = post.user.username
          json_post[ 'author' ][ 'user_id' ] = post.user.id
          json_post[ 'author' ][ 'image_url' ] = post.user.image_url
          json_post[ 'author' ][ 'user_writer_score' ] = post.user.writer_score
          json_post[ 'author' ][ 'user_reviewer_score' ] = post.user.reviewer_score
    #
    #   },
      # reader: {
          check_friendship( json_post, post )
      # },
    #   feedback: {

          json_post[ 'feedback' ][ 'feedback_num' ] = post.critiques.length
          json_post[ 'feedback' ][ 'avg_rating' ] = post.average_rating || post.update_avg_rating
          json_post[ 'feedback' ][ 'total_ratings' ] = post.ratings.where({skill: "overall"}).length
          json_post[ 'feedback' ][ 'skill_characters' ] = post.skill_rating( "characters" )
          json_post[ 'feedback' ][ 'skill_setting' ] = post.skill_rating( "setting" )
          json_post[ 'feedback' ][ 'skill_plot' ] = post.skill_rating( "plot" )
          json_post[ 'feedback' ][ 'skill_overall' ] = post.skill_rating( "overall" )
    #   }
    # }
    return json_post
  end

  def check_friendship( data, post )
    friends = current_user.friend_ids
    if friends.include? post.user.id
     data[ 'reader' ]['is_friend'] = true
    else
     data[ 'reader' ]['is_friend'] = false
    end
    return data
  end

# Friends Posts
  def friend_posts
    friend_posts = []
    current_user.friends.each do |friend|
      friend.posts.each do |post|
      friend_posts.push( post )
      end
    end
    return friend_posts
  end

# Main Feed
  def main_feed
    ids = current_user.friend_ids
    ids.push( current_user.id )

    # if genres
    #   @main_feed = Post.where( { user_id: ids } ).
    #                     where( { genre: genres } ).
    #                     order('created_at ASC')
    # else
      @main_feed = Post.where( { user_id: ids } ).
                        order('created_at ASC')
    # end

    return @main_feed
  end

  def apply_post_data( post )
    data = post.as_json
    if post.ratings.where({user_id: current_user}).exists?
      data['is_rated'] = true
      data['rating'] = Rating.where({post_id: post.id, user_id: current_user})[0].value
    else
      data['is_rated'] = false
    end
    check_friendship( data, post )
    apply_skills( data, post )
    apply_post_info( data, post )
    apply_author_info( data, post )
    return data
  end

  def apply_skills( data, post )
    data['skill_characters'] = post.skill_rating("characters")
    data['skill_setting'] = post.skill_rating("setting")
    data['skill_plot'] = post.skill_rating("plot")
    data['skill_structure'] = post.skill_rating("structure")
    data['skill_dialogue'] = post.skill_rating("dialogue")
    data['skill_style'] = post.skill_rating("style")
    data['skill_grammar'] = post.skill_rating("grammar")
    data['skill_theme'] = post.skill_rating("theme")
    data['skill_overall'] = post.skill_rating("overall")
    return data
  end

  def apply_post_info( data, post )
    time = time_ago_in_words( post.created_at )
    data['created_at_in_words'] = time
    data['avg_rating'] = post.average_rating || post.update_avg_rating
    data['total_ratings'] = post.ratings.where({skill: "overall"}).length
    data['feedback_num'] = post.critiques.length
    return data
  end

  def apply_author_info( data, post )
    data['username'] = post.user.username
    data['image_url'] = post.user.image_url
    data['user_writer_score'] = post.user.writer_score
    data['user_reviewer_score'] = post.user.reviewer_score
    return data
  end

end
