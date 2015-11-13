class Api::RatingsController < ApplicationController


  before_filter :authenticate_user!

    def create
            @post = Post.find(params[:post_id])
            if current_user.id == @post.id
                redirect_to photo_path(@post), :alert => "You cannot rate for your own post"
            else
                @rating = Rating.new(params[:rating])
                @rating.post_id = @post.id
                @rating.user_id = current_user.id
                if @rating.save
                    respond_to do |format|
                        format.html { redirect_to post(@post), :notice => "Your rating has been saved" }
                    end
                end
            end
        end

        def update
            @post = Photo.find_by_id(params[:post])
            if current_user.id == @post.id
                redirect_to post(@post), :alert => "You cannot rate for your own post"
            else
                @rating = current_user.ratings.post(@post.id)
                if @rating.update_attributes(params[:rating])
                    respond_to do |format|
                        format.html { redirect_to post(@post), :notice => "Your rating has been updated" }
                    end
                end
            end
        end


end
