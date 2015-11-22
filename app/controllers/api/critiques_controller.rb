class Api::CritiquesController < ApplicationController

  include SessionsHelper
  include UsersHelper
  include Api::PostsHelper

  respond_to :html, :json

  # before_action :current_api_user!
  def index
  post = Post.find( params[:post_id] )
  ar_critiques = post.critiques

  critiques = ar_critiques.map do |ar_critique|
    data = ar_critique.as_json
    author = User.find( ar_critique.user_id )
    data['username'] = author.username
    data['image_url'] = author.image_url
    data
  end

  render json: critiques
  end

  def create
    post = Post.find( params[:post_id] )
    critique = post.critiques.create(critique_params)
    critique.update( user_id: current_user.id )
    critique.update( votes: 0 )

    respond_to do |format|
        format.json { render json: critique }
        format.html { redirect_to '/api/posts/' + critique.post_id.to_s }
      end
  end

  def edit
    @post = Post.find( params[:post_id] )
    critique = @post.critiques.find( params[:id] )
  end

  def update
    @post = Post.find( params[:post_id] )
    critique = @post.critiques.find( params[:id] )
    critique.update({message: params[:message] });
    critique.update({votes: params[:votes] });

    respond_to do |format|

      format.json { render json: critique }
      format.html { redirect_to '/' }

    end
  end

  def destroy
    post = Post.find( params[:post_id] )
    deleted_critique = post.critiques.find(params[:id])
    deleted_critique.destroy

    respond_to do |format|

      format.json { render json: post.critiques }
      format.html { redirect_to '/users/main' }
    end

  end


  def critique_params
    params.require(:critique).permit(:user_id, :message, :post_id, :votes)
  end

end
