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
    # Account for Page Starting at
    page = params[:page].to_i + 1

    challenges = sent_challenges.paginate(:page => page, :per_page => 10)

    sending_challenges = challenges.map do |challenge|
      data = challenge.as_json
      data['username'] = challenge.friendship.friend.username
      data['image_url'] = challenge.friendship.friend.image_url
      data
    end

    render json: sending_challenges
  end

  def received
    page = params[:page].to_i + 1

    challenges = received_challenges.paginate(:page => page, :per_page => 5)

    render json: challenges
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
      sender: current_user.username,
      sender_id: current_user.id
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
      sender: current_user.username,
      sender_id: current_user.id
      });

    # render json: friendship.first.challenges
    render json: challenge
  end

  def update
    friendship = Friendship.find( params[:id] )
    challenge = friendship.challenges.find(params[:challenge_id])
    challenge.update(challenge_params)

    render json: challenge

  end


  def destroy
      friendship = Friendship.find(params[:id])
      challenge = friendship.challenges.find(params[:challenge_id])
      challenge.destroy
      render json: friendship
  end


  def challenge_params
    params.require(:challenge).permit(:friendship_id, :prompt, :prompt_type, :word_count, :status, :message, :sender, :sender_id, :response, :id, :created_at, :updated_at)
  end

end
