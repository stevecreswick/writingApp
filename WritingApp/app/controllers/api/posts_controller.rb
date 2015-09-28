class Api::PostsController < ApplicationController

include SessionsHelper
include UsersHelper
include Api::PostsHelper

respond_to :html, :json

before_action :current_api_user!
skip_before_action :current_api_user!, only: [:index]

  def index
    render json: current_user.posts
  end

  def allposts
    @posts = Post.all
    render json: @posts
  end


  def show
    render json:  current_user.posts.find( params[:id] )
  end


  def create
    @post = current_user.posts.create(post_params)

    respond_to do |format|
        format.json { render json: @post }
        format.html { redirect_to '/users/profile' }
      end
  end

  def update
  end

  def destroy
    current_user.posts.destroy( params[:id] )
     respond_to do |format|

       format.json { render json: current_user.trades }
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
