class Api::Posts::TopRatedPostsController < ApplicationController

include SessionsHelper
include UsersHelper
include Api::Posts::PostsHelper
include ActionView::Helpers::DateHelper

respond_to :html, :json

  def query
    page = params[:page].to_i + 1
    get_posts( 'top_rated', page, params[ :genre ] )
    render json: @json_posts
  end

  private

  def post_params
    params.require(:post).permit(:title, :message, :prompt, :prompt_word_count, :prompt_type,
                                 :word_count, :model_url, :genre, :votes, :time_completed )
  end


end
