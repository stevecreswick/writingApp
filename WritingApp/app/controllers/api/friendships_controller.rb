class Api::FriendshipsController < ApplicationController

    include UsersHelper
    include SessionsHelper

    def index
      current_user

      ar_friendships = current_user.friendships.where(status: 'accepted')
      friendships = ar_friendships.map do |ar_friend|
        friend = User.find( ar_friend.friend_id )
        data = ar_friend.as_json
        data['friend_name'] = friend.username
        data
      end

      render json: friendships
    end

    def pending
      ar_pending = current_user.pending_friends
      pending_friendships = ar_pending .map do |ar_pending|
        friend = User.find( ar_pending.friend_id )
        data = ar_pending.as_json
        data['friend_name'] = friend.username
        data
      end

      render json: pending_friendships
    end

    # def request
    #   @requesting = User.find(params[:friend_id])
    #   Friendship.request(current_user)
    #   redirect_to '/'
    # end

    def accept
    end

    def create
    end

    def destroy
    end

    private

    def friendship_params
      params.require(:user).permit(:user_id, :friend_id, :status)
    end


end
