class Api::RatingsController < ApplicationController

  include SessionsHelper
  include UsersHelper

  respond_to :html, :json


    def create
            @post = Post.find(params[:id])

            if current_user.id == @post.user_id
                redirect_to main_path, :alert => "You cannot rate for your own post"
            elsif ( Rating.where({user_id: current_user.id, post_id: @post.id}).exists?)
                # puts @post.ratings.where(user_id: current_user.id)
                puts '**************** Already Rated ******************'
                render json: @post
            else
                @rating = Rating.new(rating_params)
                @rating.post_id = @post.id
                @rating.user_id = current_user.id
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
            @rating = @post.ratings.where({user_id: current_user.id});
            render json: @rating[0]
          end

        end


        private

        def rating_params
          params.require(:rating).permit(:user_id, :post_id, :value)
        end

end
