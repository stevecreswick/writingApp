class Api::CritiquesController < ApplicationController

  include SessionsHelper
  include UsersHelper
  include Api::PostsHelper

  respond_to :html, :json

  # before_action :current_api_user!
  def index
  post = Post.find( params[:post_id] )
  render json: post.critiques
  end

  def create
    post = Post.find( params[:post_id] )
    critique = post.critiques.create(critique_params)
    critique.update( user_id: current_user.id )

    respond_to do |format|
        format.json { render json: critique }
        format.html { redirect_to '/api/posts/' + critique.post_id.to_s }
      end
  end

  def update
    @post = Post.find( params[:post_id] )
    critique = @post.critiques.find( params[:id] )
    critique.update( params[ critique_params ] )
    respond_to do |format|

      format.json { render json: critique }
      format.html { redirect_to '/' }

    end
  end

  def destroy
    binding.pry
  end


  def critique_params
    params.require(:critique).permit(:user_id, :message, :post_id, :votes)
  end

end
