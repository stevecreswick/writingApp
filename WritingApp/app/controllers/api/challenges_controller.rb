class Api::ChallengesController < ApplicationController

  respond_to :html, :json

  def index
    friendship = Friendship.find( params[:id] )
    render json: friendship.challenges
  end

  def show
    friendship = Friendship.find( params[:id] )
    challenge = friendship.challenges.find(params[:challenge_id])
    render json: challenge
  end

  def create
    friendship = Friendship.find( params[:id] )
    challenge = friendship.challenges.create(challenge_params)

    respond_to do |format|
        format.json { render json: challenge }
        format.html { redirect_to '/api/friendhsip/' + challenge.friendship_id.to_s }
      end
  end


  def destroy
      friendship = Friendship.find(params[:id])
      challenge = friendship.challenges.find(params[:challenge_id])
      challenge.destroy
      # Friendship.destroy(id: @friendship.id)
      redirect_to api_friends_path
  end


  def challenge_params
    params.require(:challenge).permit(:friendship_id, :prompt, :prompt_type, :word_count, :status, :message)
  end

end
