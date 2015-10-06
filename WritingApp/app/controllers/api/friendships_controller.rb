class Api::FriendshipsController < ApplicationController

    include UsersHelper
    include SessionsHelper

    def index
      current_user
      render json: current_user.friendships
    end

    def pending
      current_user
      render json: current_user.pending_friendships
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
