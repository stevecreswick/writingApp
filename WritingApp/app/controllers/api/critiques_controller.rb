class Api::CritiquesController < ApplicationController


  include SessionsHelper
  include UsersHelper
  include Api::PostsHelper

  respond_to :html, :json

  # before_action :current_api_user!
  def index
  @post = Post.find( params[:post_id] )
    respond_to do |format|
      format.json { render json: @post.critiques }
      format.html { redirect_to '/posts/' + @post.id }
    end
  end

  def create

    @post = Post.find( params[:post_id] )
    @critique = @post.critiques.create(critique_params)

    respond_to do |format|
        format.json { render json: @critique }
        format.html { redirect_to '/posts/' + @critique.post_id.to_s }
      end
  end

  def critique_params
    params.require(:critique).permit(:user_id, :message, :post_id)
  end

end
