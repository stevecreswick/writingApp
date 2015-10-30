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

  def show
    @user = User.find(params[:id])
  end

  def create

    @user = User.new(user_params)

    if @user.image_url == ""
      @user.image_url = "http://i.imgur.com/yvuo0U2.png"
    end

    if @user.save
      respond_to do |format|
      format.html { redirect_to log_in_path}
      format.json { render json: @user }
      end
    else
      respond_to do |format|
      format.html { redirect_to welcome_path}
      end
    end
  end

  def edit
    @user = current_user
  end

  def update
    @user = User.find(params[:id])
    @user.update(user_params)
    if @user.save
      respond_to do |format|
      format.html { redirect_to main_path}
      format.json { render json: @user }
      end
    end
  end

  def main
    # return nil if !authenticate!
    @user = current_user
    render layout: "main_layout"
  end

  def profile
    # return nil if !authenticate!
    @user = User.find(params[:id])
    render layout: "profile_layout"
  end

  def show_post
    @user = User.find( params[:user_id])
    @post = @user.posts.find( params[:post_id] )
    # render layout: "profile_layout"

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
    params.require(:user).permit(:username, :password, :image_url, :from, :favorite_book, :favorite_author, :favorite_genre, :currently_reading, :about, :writing_goal)
  end

end
