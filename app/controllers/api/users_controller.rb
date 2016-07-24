class Api::UsersController < ApplicationController

    include UsersHelper
    include SessionsHelper

  def index
    @users = User.all
    # render json: users
  end



  def show
    user = User.find(params[:id])
    render json: user
  end

  def create

    @user = User.new(user_params)

    if @user.image_url == ""
      @user.image_url = "http://i.imgur.com/yvuo0U2.png"
    end

    @user.update({writer_score: 0, reviewer_score: 0});

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
    render layout: "profile_layout"
  end

  def update
    @user = User.find(params[:id])
    @user.update(user_params)
    if @user.save
      # respond_to do |format|
      redirect_to main_path
      # format.json { render json: @user }
      # end
    end
    # redirect_to main_path
  end

  def main
    # return nil if !authenticate!
    @user = current_user
    render layout: "main_layout"
  end

  def profile
    # return nil if !authenticate!
    @user = User.find(params[:id])
    @current_user = current_user
    render layout: "profile_layout"
  end

  def show_post
    @current_user = current_user
    @user = User.find( params[:user_id])
    @post = @user.posts.find( params[:post_id] )
    render layout: "post_layout"

  end

  def login
  end

  def register
    @user = User.new
  end

  def all_friends

    render json: current_user.friends

  end

# Friends page

  def friends
    page = params[:page].to_i + 1


    friendships = current_user.friendships.paginate :page => page
    friends = friendships.map do |friendship|
      friend = User.find( friendship.friend_id )
      data = friend.as_json
      data['is_friend'] = true
      data['posts'] = friend.posts.length
      data['reviews'] = friend.critiques.length
      # data['friend_name'] = friend.username
      # data['friend_image'] = friend.image_url
      # data['writer_score'] = friend.writer_score
      # data['reviewer_score'] = friend.reviewer_score
      # data['username'] = friend.username
      # data['username'] = friend.username

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

    page = params[:page].to_i + 1


    inverse_friends = current_user.inverse_friends.paginate :page => page

    followers = inverse_friends.map do |follower|
      data = follower.as_json

      friends = current_user.friend_ids

       if friends.include? follower.id
         data['is_friend'] = true
       else
         data['is_friend'] = false
       end

      data['friend_name'] = follower.username
      data['friend_image'] = follower.image_url
      data['posts'] = follower.posts.length
      data['reviews'] = follower.critiques.length
      data
    end

    render json: followers

  end



  def add_friends

    page = params[:page].to_i + 1

    new_friends = current_user.potential_friends.paginate :page => page

    add_friends = new_friends.map do |user|

        data = user.as_json
        data['is_friend'] = false
        data['friend_name'] = user.username
        data['friend_image'] = user.image_url
        data['posts'] = user.posts.length
        data['reviews'] = user.critiques.length
        data

    end

    render json: add_friends
  end


  def writers_leaderboard

    page = params[:page].to_i + 1

    writing_leaders = User.order('writer_score desc')
    users = writing_leaders.paginate :page => page

    results = users.map do |user|

        data = user.as_json
        data['is_friend'] = false
        data['friend_name'] = user.username
        data['friend_image'] = user.image_url
        data['posts'] = user.posts.length
        data['reviews'] = user.critiques.length
        data

    end

    render json: results

  end


  def readers_leaderboard

    page = params[:page].to_i + 1

    reading_leaders = User.order('reviewer_score desc')
    users = reading_leaders.paginate :page => page

    results = users.map do |user|

        data = user.as_json
        data['is_friend'] = false
        data['friend_name'] = user.username
        data['friend_image'] = user.image_url
        data['posts'] = user.posts.length
        data['reviews'] = user.critiques.length
        data

    end

    render json: results

  end



  def search
    page = params[:page].to_i + 1

  if params[:search] != ""
     users = User.search(params[:search])
     searched_users = users.paginate(:page => page, :per_page => 20)

     results = searched_users.map do |user|

         data = user.as_json
         data['is_friend'] = false
         data['friend_name'] = user.username
         data['friend_image'] = user.image_url
         data['posts'] = user.posts.length
         data['reviews'] = user.critiques.length
         data

     end

     render json: results
  elsif
    redirect_to add_friends_path
  end



  end


  private

  def user_params
    params.require(:user).permit(:username, :password, :image_url, :email, :from, :favorite_book, :favorite_author, :favorite_genre, :currently_reading, :about, :writing_goal, :writer_score, :reviewer_score)
  end

end
