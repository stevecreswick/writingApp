class Api::Posts::Ratings::RatingsController < ApplicationController

  include SessionsHelper
  include Api::Posts::Ratings::RatingsHelper

  respond_to :html, :json

    def create
      @post = Post.find( params[ :id ] )

      if current_user.id == @post.user_id

        render :nothing => true, :status => 311
      elsif already_rated( @post, rating_params[ :skill ] )

        update_rating
      else

        new_rating
      end

      render :nothing => true, :status => 200
    end

    def query
      @post = Post.find( params[ :id ] )
      skill = params[ :skill ]
      skills = ['overall', 'plot', 'characters', 'settings']
      ratings = []
      skills.each do | skill |
        # if @post.ratings.where( { skill: skill, user_id: current_user.id } ).last
          rating = @post.ratings.where( { skill: skill, user_id: current_user.id } ).last
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

            data['post_author_id'] = @post.user_id

            ratings.push( data )
          else
            data = {}

            data['skill'] = skill
            data['is_rated'] = false
            data['user_vote'] = 0
            data['value'] = 0
            data['total_votes'] = @post.ratings.where( { skill: skill } ).length
            data['post_id'] = @post.id
            data['post_author_id'] = @post.user_id
            data['vote_count'] = 0

            Rating.where(:skill => skill).find_each do |rating|
              data['vote_count'] += rating.value.to_i
            end

            if skill == 'overall'
              data['max_value'] = 10
            else
              data['max_value'] = 5
            end
            data = data.as_json

            ratings.push( data )
          end
        end
      render json: ratings
    else
  end


    private

    def rating_params
      params
      .require( :rating )
      .permit(
        :id,
        :user_id,
        :post_id,
        :value,
        :skill,
        :max_value
      )
    end

end
