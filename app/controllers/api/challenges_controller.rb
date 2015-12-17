class Api::ChallengesController < ApplicationController

  include SessionsHelper
  include UsersHelper
  include ChallengesHelper


  respond_to :html, :json

  def index
    friendship = Friendship.find( params[:id] )
    render json: friendship.challenges
  end

  def sent
    render json: sent_challenges
  end

  def received
    render json: received_challenges
  end

  def completed
    render json: completed_challenges
  end

  def show
    friendship = Friendship.find( params[:id] )
    challenge = friendship.challenges.find(params[:challenge_id])
    render json: challenge
  end

  def create
    friendship = Friendship.find( params[:id] )
    challenge = friendship.challenges.create(challenge_params)
    challenge.update({
      status: 'Open',
      sender: current_user.username
      });

    respond_to do |format|
        format.json { render json: challenge }
        format.html { redirect_to '/api/friendhsip/' + challenge.friendship_id.to_s }
      end
  end

  def create_friend
    friendship = Friendship.where({friend_id: params[:friend_id], user_id: current_user.id})
    challenge = friendship.first.challenges.create( challenge_params )

    challenge.update({
      status: 'Open',
      # sender: current_user.username
      });

    # render json: friendship.first.challenges
    render json: challenge
  end

  def update
    friendship = Friendship.find( params[:id] )
    challenge = friendship.challenges.find(params[:challenge_id])
    challenge.update(challenge_params)

    respond_to do |format|
        format.json { render json: challenge }
        format.html { redirect_to '/api/friendhsip/' + challenge.friendship_id.to_s }
      end

  end


  def destroy
      friendship = Friendship.find(params[:id])
      challenge = friendship.challenges.find(params[:challenge_id])
      challenge.destroy
      render json: friendship
  end


  def challenge_params
    params.require(:challenge).permit(:friendship_id, :prompt, :prompt_type, :word_count, :status, :message, :sender)
  end

end
