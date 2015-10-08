class Api::FriendshipsController < ApplicationController

    include UsersHelper
    include SessionsHelper
    include Api::FriendshipsHelper

    # def index
    #   ar_friendships = current_user.friendships.where(status: 'accepted')
    #   friendships = ar_friendships.map do |ar_friend|
    #     friend = User.find( ar_friend.friend_id )
    #     data = ar_friend.as_json
    #     data['friend_name'] = friend.username
    #     data
    #   end
    #   render json: friendships
    # end

    def index
    @user = current_user
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

    def requested
      ar_requested = current_user.friendships.where(status: 'requested')
      requested_friendships = ar_requested.map do |ar_requested|
        friend = User.find( ar_requested.friend_id )
        data = ar_requested.as_json
        data['friend_name'] = friend.username
        data
      end

      render json: requested_friendships
    end

    def accept
    end


    def create

      already_friends = current_user.friendships.exists?(:friend_id => params[:friend_id]);

      if !already_friends  && (params[:friend_id].to_i != current_user.id)
        @friendship = current_user.friendships.build(:friend_id => params[:friend_id])
        if @friendship.save
          redirect_to api_friends_path
        else
          redirect_to api_friends_path
        end
      else
        redirect_to api_friends_path
      end
    end

    def destroy
        @friendship = current_user.friendships.where({friend_id: params[:friend_id]}).first
        @friendship.destroy
        # Friendship.destroy(id: @friendship.id)
        redirect_to api_friends_path
    end

    private

    def friendship_params
      params.require(:user).permit(:user_id, :friend_id, :status)
    end


end
