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
      else
          @rating = Rating.create( rating_params )
          @rating.update( {
            post_id: @post.id,
            user_id: current_user.id
          } );

          if @rating.save
            render json: @post
          end
      end
    end

    def update
        @post = Post.find( params[ :id ] )
        if current_user.id == @post.id
          redirect_to post( @post ), :alert => "You cannot rate for your own post"
        else
          @rating = current_user.ratings.post( @post.id )
        if @rating.update_attributes( rating_params )
          respond_to do | format |
            format.html { redirect_to post( @post ), :notice => "Your rating has been updated" }
          end
        end
      end
    end

    def query
      @post = Post.find( params[ :id ] )
      skill = params[ :skill ]

      if @post.ratings.where( { skill: skill, user_id: current_user.id } ).last
        skills = ['overall', 'plot', 'characters', 'settings']
        ratings = []

        skills.each do | skill |
          rating = @post.ratings.where( { skill: skill, user_id: current_user.id } ).last
          puts rating
          data = rating.as_json
          if data
            data['vote_count'] = 0
            Rating.where(:skill => skill).find_each do |rating|
              data['vote_count'] += rating.value.to_i
            end

            data['is_rated'] = true
            data['user_vote'] = @post.ratings.where( { skill: skill, user_id: current_user.id } ).last.value
            data['total_votes'] = @post.ratings.where( { skill: skill } ).length

            if skill == 'overall'
              data['max_value'] = 10
            else
              data['max_value'] = 5
            end
            ratings.push( data )

          else
            data = {}.as_json
            data['skill'] = skill
            data['is_rated'] = false
            data['user_vote'] = 0
            data['value'] = 0
            data['total_votes'] = @post.ratings.where( { skill: skill } ).length
            data['post_id'] = @post.id
            data['user_id'] = current_user.id
            data['vote_count'] = 0
            Rating.where(:skill => skill).find_each do |rating|
              data['vote_count'] += rating.value.to_i
            end

            if skill == 'overall'
              data['max_value'] = 10
            else
              data['max_value'] = 5
            end

            ratings.push( data )
          end
        end
        render json: ratings
      else
        render :nothing, :status => 300
      end
    end


    private

    def rating_params
      params.permit(:user_id, :post_id, :value, :skill)
    end

end
