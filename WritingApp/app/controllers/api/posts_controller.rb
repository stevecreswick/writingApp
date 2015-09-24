class Api::PostsController < ApplicationController

include SessionsHelper
include UsersHelper

respond_to :html, :json


  def index
    render json: current_user.posts
  end

  def show
    render json:  current_user.posts.find( params[:id] )
  end

  def create

    @post = current_user.posts.create(  )

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
    params.require(:post).permit(:title, :message)
  end


end
