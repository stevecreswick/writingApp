class Api::VotesController < ApplicationController

  include SessionsHelper
  include UsersHelper

  respond_to :html, :json


    def create

            @post = Post.find(params[:post_id])
            @critique = @post.critiques.find(params[:id])

            if current_user.id == @critique.user_id
                render json: @critique
            elsif ( Vote.where({user_id: current_user.id, critique_id: @critique.id}).exists?)
                puts '**************** Already Rated ******************'
                render json: @critique
            else
                @critique_vote = Vote.new(vote_params)
                @critique_vote.critique_id = @critique.id
                @critique_vote.user_id = current_user.id

                # Raises the author's writing score
                critique_author = User.find( @critique.user_id )
                current_user.update({ reviewer_score: critique_author.reviewer_score += 1 })

                if @critique_vote.save
                  render json: @critique
                end
            end
        end

        # def update
        #     @post = Post.find(params[:id])
        #     if current_user.id == @post.id
        #         redirect_to post(@post), :alert => "You cannot rate for your own post"
        #     else
        #         @rating = current_user.ratings.post(@post.id)
        #         if @rating.update_attributes(rating_params)
        #             respond_to do |format|
        #                 format.html { redirect_to post(@post), :notice => "Your rating has been updated" }
        #             end
        #         end
        #     end
        # end

        def user_rating
          @post = Post.find(params[:post_id])
          @critique = @post.critiques.find(params[:id])

          if current_user.id == @post.user_id
            render json: @post
          else
            @rating = @post.ratings.where({user_id: current_user.id});
            render json: @rating[0]
          end

        end


        private

        def vote_params
          params.require(:vote).permit(:user_id, :critique_id, :votes)
        end

end
