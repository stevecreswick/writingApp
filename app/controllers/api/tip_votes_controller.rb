class Api::TipVotesController < ApplicationController

  include SessionsHelper
  include UsersHelper
  include Api::PostsHelper

  respond_to :html, :json

    def index
      tip_votes = TipVote.all
      render json: tip_votes
    end

    def create

            @tip = WritingTip.find(params[:id])

            if current_user.id == @tip.user_id
                # Cannot vote on your own resource
                render json: @resource
                puts '*** Cannot Vote for your own Post ***'

            elsif ( TipVote.where({user_id: current_user.id, writing_tip_id: @tip.id}).exists?)

                puts '**************** Already Rated ******************'
                render json: @resource

            else

                @tip_vote = TipVote.new(tip_vote_params)

                # if

                @tip_vote.writing_tip_id = @tip.id
                @tip_vote.user_id = current_user.id

                if @tip_vote.save
                  render json: @tip
                end
            end
        end


        def user_vote
          @writing_tip = WritingTip.find(params[:post_id])

          if current_user.id == @writing_tip.user_id
            render json: @writing_tip
          else
            @vote = @post.ratings.where({user_id: current_user.id});
            render json: @vote
          end

        end


        private

        def tip_vote_params
          params.require(:tip_vote).permit(:user_id, :writing_tip_id, :value)
        end

end
