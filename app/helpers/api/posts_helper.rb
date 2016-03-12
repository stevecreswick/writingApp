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
    friend_posts = []
    current_user.friends.each do |friend|
      friend.posts.each do |post|
      friend_posts.push( post )
      end
    end
    return friend_posts
  end

  def main_feed
    ids = current_user.friend_ids
    ids.push( current_user.id )
    @main_feed = Post.where({user_id: ids}).order('created_at DESC')
    return @main_feed
  end

  def get_posts_by_genre( page, genre )
    if genre == "all"
      @posts = Post.paginate(:page => page).order('created_at DESC')
    elsif genre == 'user'
      @posts = current_user.posts.paginate(:page => page).order('created_at DESC')
    elsif genre == 'main'
      @posts = main_feed.paginate( :page => page )
    else
      @posts = Post.where({genre: genre}).paginate(:page => page)
    end
  end

  def get_posts( page, genre )
    get_posts_by_genre( page, genre )

    @json_posts = @posts.map do |post|
      apply_post_data( post )
    end

    return @json_posts
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

  def check_friendship( data, post )
    friends = current_user.friend_ids
    if friends.include? post.user.id
     data['is_friend'] = true
    else
     data['is_friend'] = false
    end
    return data
  end

  def apply_post_info( data, post )
    time = time_ago_in_words( post.created_at )
    data['created_at_in_words'] = time
    data['avg_rating'] = post.average_rating
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
