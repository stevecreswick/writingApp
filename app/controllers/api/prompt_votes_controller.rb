class Api::PromptVotesController < ApplicationController

  include SessionsHelper
  include UsersHelper
  include Api::PostsHelper

  respond_to :html, :json

    def index
      prompt_votes = PromptVote.all
      render json: prompt_votes
    end

    def create

            @prompt = WritingPrompt.find(params[:id])

            if current_user.id == @prompt.user_id
                # Cannot vote on your own resource
                render json: @prompt
                puts '*** Cannot Vote for your own Prompt ***'

            elsif ( PromptVote.where({user_id: current_user.id, writing_prompt_id: @prompt.id}).exists?)

                puts '**************** Already Rated ******************'
                render json: @prompt

            else

                @prompt_vote = PromptVote.new(prompt_vote_params)

                # if

                @prompt_vote.writing_prompt_id = @prompt.id
                @prompt_vote.user_id = current_user.id

                if @prompt_vote.save
                  render json: @prompt
                end
            end
        end


        private

        def prompt_vote_params
          params.require(:prompt_vote).permit(:user_id, :writing_prompt_id, :value)
        end

end
