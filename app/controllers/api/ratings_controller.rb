class Api::RatingsController < ApplicationController

  include SessionsHelper
  include UsersHelper

  respond_to :html, :json


    def create
            @post = Post.find(params[:id])

            # If a rating for that skill exists

            if current_user.id == @post.user_id
              puts '**************** Users Post ******************'

              render :nothing => true, :status => 500
            elsif ( Rating.where({user_id: current_user.id, post_id: @post.id, skill: rating_params["skill"]}).exists?)
                puts '**************** Already Rated ******************'
                render :nothing => true, :status => 333
            else
                @rating = Rating.create(rating_params)
                @rating.update({
                  post_id: @post.id,
                  user_id: current_user.id
                });

                # Raises the author's writing score
                # post_author = User.find( @post.user_id )
                # writer_score = post_author.writer_score + @rating.value.to_i
                # post_author.update({ writer_score: writer_score  })
                # post_author.save
                # Raise the reviewers reviewer score
                # new_score = current_user.reviewer_score + 1
                # current_user.update({reviewer_score: new_score})

                if @rating.save
                        render json: @post
                end
            end
        end

        def update
            @post = Post.find(params[:id])
            if current_user.id == @post.id
                redirect_to post(@post), :alert => "You cannot rate for your own post"
            else
                @rating = current_user.ratings.post(@post.id)
                if @rating.update_attributes(rating_params)
                    respond_to do |format|
                        format.html { redirect_to post(@post), :notice => "Your rating has been updated" }
                    end
                end
            end
        end

        def user_rating
          @post = Post.find(params[:id])

          if current_user.id == @post.user_id
            render json: @post
          else
            @ratings = @post.ratings.where({user_id: current_user.id});
            render json: @ratings
          end

        end


        private

        def rating_params
          params.require(:rating).permit(:user_id, :post_id, :value, :skill)
        end

end
