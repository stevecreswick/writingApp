class Api::ChallengesController < ApplicationController

  include SessionsHelper
  include UsersHelper

  respond_to :html, :json

  def index
    friendship = Friendship.find( params[:id] )
    render json: friendship.challenges
  end

  def all_challenges
    friendships = current_user.friendships
    all_challenges = []

    friendships.each do |friendship|
      friendship.challenges.each do |challenge|
        all_challenges.push(challenge)
      end
    end

    render json: all_challenges
  end

  def received
    received_challenges = []

    current_user.inverse_friendships.each do |inverse_friendship|
      inverse_friendship.challenges.each do |inverse_challenge|
        received_challenges.push( inverse_challenge )
      end
    end

    render json: received_challenges
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
