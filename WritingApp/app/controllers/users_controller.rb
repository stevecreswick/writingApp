class UsersController < ApplicationController

    include UsersHelper
    include SessionsHelper

  def index
    @users = User.all
    # render json: users
  end

  def add_friends
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
    friendships = current_user.friendships
    friends = friendships.map do |friendship|
      friend = User.find( friendship.friend_id )
      data = friendship.as_json
      data['friend_name'] = friend.username
      data
    end
    render json: friends

    # render json: current_user.friendships
    # @user = current_user
    # @allusers = User.all
    # @friendships = Friendship.all
    # @newfriendship = Friendship.new
  end


  def followers
  render json: current_user.inverse_friends
  end





  private

  def user_params
    params.require(:user).permit(:username, :password)
  end

end
