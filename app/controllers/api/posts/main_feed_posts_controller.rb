class Api::Posts::MainFeedPostsController < ApplicationController

include SessionsHelper
include UsersHelper
include Api::Posts::PostsHelper
include ActionView::Helpers::DateHelper

respond_to :html, :json

  def query
    page = params[:page].to_i + 1

    if params['genres']
    genres = params['genres'].split(',')
    end

    get_posts( 'main', genres, page )
    render json: @json_posts
  end

  private

  def post_params
    params.require(:post).permit(:title, :message, :prompt, :prompt_word_count, :prompt_type,
                                 :word_count, :model_url, :genre, :votes, :time_completed )
  end


end
