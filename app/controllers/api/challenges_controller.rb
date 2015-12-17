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
    username = current_user.username
    challenge = friendship.challenges.create(challenge_params)
    challenge.update({
      status: 'Open',
      sender: username
      });

    respond_to do |format|
        format.json { render json: challenge }
        format.html { redirect_to '/api/friendhsip/' + challenge.friendship_id.to_s }
      end
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
      redirect_to api_friends_path
  end


  def challenge_params
    params.require(:challenge).permit(:friendship_id, :prompt, :prompt_type, :word_count, :status, :message, :sender)
  end

end
