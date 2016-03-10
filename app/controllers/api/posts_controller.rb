class Api::PostsController < ApplicationController

include SessionsHelper
include UsersHelper
include Api::PostsHelper
include ActionView::Helpers::DateHelper

respond_to :html, :json

  def query
    page = params[:page].to_i + 1
    get_posts( page, params[ :genre ] )
    render json: @json_posts
  end

  def show
    # current_api_user!
    aRpost = Post.find(params[:id])
    data = aRpost.as_json
    data['username'] = aRpost.user.username
    data['image_url'] = aRpost.user.image_url
    data['created_at'] = Date.strptime(aRpost.created_at.to_s)
    data['avg_rating'] = aRpost.average_rating
    render json: data
  end


  def genre
  active_record_posts = Post.where({genre: params[:genre]})
  posts = active_record_posts.map do |aRpost|
    data = aRpost.as_json
    data['username'] = aRpost.user.username
    data['image_url'] = aRpost.user.image_url
    data['avg_rating'] = aRpost.average_rating
    data
  end
  render json: posts
  end


  def user_posts
    # Account for Page Starting at 0
    page = params[:page].to_i + 1

    aRposts = Post.where(user_id: params[:user_id] ).paginate :page => page

    posts = aRposts.map do |aRpost|
      data = aRpost.as_json

      time = time_ago_in_words(aRpost.created_at)

      data['username'] = aRpost.user.username
      data['image_url'] = aRpost.user.image_url

      data['created_at'] = time
      data['avg_rating'] = aRpost.average_rating

      data['user_writer_score'] = aRpost.user.writer_score
      data['user_reviewer_score'] = aRpost.user.reviewer_score

      data['total_ratings'] = aRpost.ratings.length
      data['feedback_num'] = aRpost.critiques.length
      data
    end

    render json: posts
    # redirect_to '/users/post/:id'
  end

  def create
    # current_api_user!
    post = current_user.posts.create(post_params)
    data = post.as_json
    data['username'] = post.user.username
    respond_to do |format|
        format.json { render json: data }
        format.html { redirect_to '/' }
      end
  end

  def edit

      @post = current_user.posts.find( params[:id] )

    end

    def update

      post = current_user.posts.find( params[:id] )
      posts.update( params[ post_params ] )
      respond_to do |format|

        format.json { render json: post }
        format.html { redirect_to '/' }

      end
    end

  def destroy

    current_api_user!
    @deleted_post = Post.find(params[:id])

    if (@deleted_post.user_id = current_user.id)
    @deleted_post.destroy
    else
    puts 'Not this users post'
    end

     respond_to do |format|

       format.json { render json: current_user.posts }
       format.html { redirect_to '/users/main' }
     end

  end



  private

  def post_params
    params.require(:post).permit(:title, :message, :prompt, :prompt_word_count, :prompt_type, :word_count, :model_url, :genre, :votes, :time_completed)
  end


end
