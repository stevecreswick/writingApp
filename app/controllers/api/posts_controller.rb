class Api::PostsController < ApplicationController

include SessionsHelper
include UsersHelper
include Api::PostsHelper

respond_to :html, :json


  def index
    # current_api_user!
    # aRposts = @current_user.posts
    aRposts = Post.order(created_at: :desc)
    posts = aRposts.map do |aRpost|
      data = aRpost.as_json


      data['username'] = aRpost.user.username
      data['image_url'] = aRpost.user.image_url
      data['created_at'] = Date.strptime(aRpost.user.created_at.to_s)
      data['avg_rating'] = aRpost.average_rating
      data
    end
    render json: posts
  end

  def paginated

    # Account for Page Starting at 0
    page = params[:page].to_i + 1

    if params[:genre] == "all"
      @posts = Post.paginate :page => page
    else
      @posts = Post.where({genre: params[:genre]}).paginate :page => page
    end

        posts = @posts.map do |aRpost|

          data = aRpost.as_json

          if aRpost.ratings.where({user_id: current_user}).exists?
            puts "*************** rating exists *********************"
            data['is_rated'] = true
            data['rating'] = Rating.where({post_id: aRpost.id, user_id: current_user})[0].value
            puts data['is_rated']
            puts data['rating']
            puts "*************** ID:" + aRpost.id.to_s  + "*********************"
          else
            puts "*************** rating *********************"
            data['is_rated'] = false

          end

          friends = current_user.friend_ids

           if friends.include? aRpost.user.id
             data['is_friend'] = true
           else
             data['is_friend'] = false
           end


          data['username'] = aRpost.user.username
          data['image_url'] = aRpost.user.image_url
          data['created_at'] = Date.strptime(aRpost.user.created_at.to_s)
          data['avg_rating'] = aRpost.average_rating
          data['total_ratings'] = aRpost.average_rating
          data
        end

          render json: posts
  end

  def show
    # current_api_user!
    # aRposts = @current_user.posts
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
    # current_api_user!
    aRposts = Post.where(user_id: params[:user_id] )
    posts = aRposts.map do |aRpost|
      data = aRpost.as_json
      data['username'] = aRpost.user.username
      data['image_url'] = aRpost.user.image_url
      data['created_at'] = Date.strptime(aRpost.user.created_at.to_s)
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
    params.require(:post).permit(:title, :message, :prompt, :prompt_word_count, :prompt_type, :word_count, :model_url, :genre, :votes)
  end


end
