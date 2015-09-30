class Api::PostsController < ApplicationController

include SessionsHelper
include UsersHelper
include Api::PostsHelper

respond_to :html, :json


  def index
    current_api_user!
    render json: @current_user.posts
  end

  def allposts
    arPosts = Post.all
    posts = arPosts.map do |arPost|
      data = arPost.as_json
      data['username'] = arPost.user.username
      data
    end
    render json: posts
  end


  def show
    current_api_user!
    @post = current_user.posts.find( params[:id] )
    redirect_to '/users/post/:id'
  end


  def create
    # current_api_user!
    @post = current_user.posts.create(post_params)

    respond_to do |format|
        format.json { render json: @post }
        format.html { redirect_to '/users/profile' }
      end
  end

  def update
  end

  def destroy

    current_api_user!
    binding.pry
    @deleted_post = Post.find(params[:id])

    if (@deleted_post.user_id = current_user.id)
    @deleted_post.destroy
    else
    puts 'Not this users post'
    end

     respond_to do |format|

       format.json { render json: current_user.posts }
       format.html { redirect_to '/users/profile' }
     end

  end

  def edit
  end

  private

  def post_params
    params.require(:post).permit(:message)
  end


end
