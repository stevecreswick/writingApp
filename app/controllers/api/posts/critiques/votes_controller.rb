class Api::Posts::Critiques::VotesController < ApplicationController

  include SessionsHelper
  include UsersHelper

  respond_to :html, :json


    def create
            @post = Post.find(params[:post_id])
            @critique = @post.critiques.find(params[:id])

            if current_user.id == @critique.user_id
                render json: @critique
            elsif ( Vote.where( {
              user_id: current_user.id,
              critique_id: @critique.id } )
              .exists? )
                vote = Vote.where( {
                  user_id: current_user.id,
                  critique_id: @critique.id } ).first
                new_value = vote_params['value'].to_i
                vote.update( { value: new_value } )
                if vote.save
                  puts vote
                  render json: @critique
                end
            else
                @critique_vote = Vote.new(vote_params)

                # if

                @critique_vote.critique_id = @critique.id
                @critique_vote.user_id = current_user.id

                # Raises the author's writing score
                critique_author = User.find( @critique.user_id )
                new_score = critique_author.reviewer_score.to_i + 1
                current_user.update({ reviewer_score: new_score})

                if @critique_vote.save
                  render json: @critique
                end
            end
        end



        def user_vote
          @post = Post.find(params[:post_id])
          @critique = @post.critiques.find(params[:id])

          if current_user.id == @critique.user_id
            render json: @critique
          else
            @vote = @post.ratings.where({user_id: current_user.id});
            render json: @vote
          end

        end


        private

        def vote_params
          params.require(:vote).permit(:user_id, :critique_id, :value)
        end

end
