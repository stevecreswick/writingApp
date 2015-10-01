class Api::PostsController < ApplicationController

include SessionsHelper
include UsersHelper
include Api::PostsHelper

respond_to :html, :json


  def index
    current_api_user!
    # aRposts = @current_user.posts
    aRposts = Post.all
    posts = aRposts.map do |aRpost|
      data = aRpost.as_json
      data['username'] = aRpost.user.username
      data
    end
    render json: posts
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
    puts '*********** Creating Post ******************'
    post = current_user.posts.create(post_params)
    puts post.message
    puts '*************Add Username***************'
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
       format.html { redirect_to '/users/profile' }
     end

  end



  private

  def post_params
    params.require(:post).permit(:message)
  end


end
