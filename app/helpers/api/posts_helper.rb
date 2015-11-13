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

end
