class UsersController < ApplicationController

    include UsersHelper
    include SessionsHelper

  def index
    users = User.all
    render json: users
  end

  def create

    @user = User.new(user_params)
    if @user.save
      respond_to do |format|
      format.html { redirect_to log_in_path}
      format.json { render json: @user }
      end
    end
  end

  def main
    # return nil if !authenticate!
    @user = current_user
    render layout: "profile_layout"
  end

  def profile
    # return nil if !authenticate!
    @user = current_user
    render layout: "profile_layout"
  end

  def show_post
    @user = User.find( params[:user_id])
    @post = @user.posts.find( params[:post_id] )
    render layout: "profile_layout"

  end


  def login
  end

  def register
    @user = User.new
  end

  def friends
    @user = current_user
    @allusers = User.all
    @friendships = Friendship.all

    @newfriendship = Friendship.new
    binding.pry
  end





  private

  def user_params
    params.require(:user).permit(:username, :password)
  end

end
