class Api::CritiquesController < ApplicationController

  include SessionsHelper
  include UsersHelper
  include Api::PostsHelper

  respond_to :html, :json

  # before_action :current_api_user!
  def index

  # Account for Page Starting at 0
  page = params[:page].to_i + 1

  post = Post.find( params[:post_id] )

  ar_critiques = post.critiques

  critiques = ar_critiques.map do |ar_critique|

    @total_votes = 0

    ar_critique.votes.map do |vote|
      @total_votes = @total_votes + vote.value
    end

    data = ar_critique.as_json
    author = User.find( ar_critique.user_id )
    data['username'] = author.username
    data['image_url'] = author.image_url

    if @total_votes > 0
    data['total_votes'] = @total_votes
    else
    data['total_votes'] = 0
    end

    data
  end

  render json: critiques
  end


  def page

  # Account for Page Starting at 0
  page = params[:page].to_i + 1

  post = Post.find( params[:post_id] )

  ar_critiques = post.critiques.paginate(:page => page).order('created_at DESC')

  critiques = ar_critiques.map do |ar_critique|

    @total_votes = 0

    ar_critique.votes.map do |vote|
      @total_votes = @total_votes + vote.value
    end

    data = ar_critique.as_json
    author = User.find( ar_critique.user_id )
    data['username'] = author.username
    data['image_url'] = author.image_url

    if @total_votes > 0
    data['total_votes'] = @total_votes
    else
    data['total_votes'] = 0
    end

    data
  end

  render json: critiques
  end

  def show
    post = Post.find( params[:post_id] )
    ar_critique = post.critiques.find( params[:id] )

      @total_votes = 0

      ar_critique.votes.map do |vote|
        @total_votes = @total_votes + vote.value
      end

      data = ar_critique.as_json
      author = User.find( ar_critique.user_id )
      data['username'] = author.username
      data['image_url'] = author.image_url

      if ( @total_votes > 0 )
      data['total_votes'] = @total_votes
      else
      data['total_votes'] = 0
      end

    render json: data

  end

  def create
    post = Post.find( params[:post_id] )
    critique = post.critiques.create(critique_params)
    critique.update( {user_id: current_user.id} )
    # critique.update( {votes: 0} )

    # Check to see how long the critique was
    words = critique.message.split(' ').length

    # Raise reviewer score based on length of review
    if words > 400
      current_user.update({reviewer_score: current_user.reviewer_score + 5})
    elsif words > 200
      current_user.update({reviewer_score: current_user.reviewer_score + 4})
    elsif words > 100
      current_user.update({reviewer_score: current_user.reviewer_score + 3})
    elsif words > 50
      current_user.update({reviewer_score: current_user.reviewer_score + 2})
    elsif words > 25
      current_user.update({reviewer_score: current_user.reviewer_score + 1})
    end

    render json: critique

  end

  def edit
    @post = Post.find( params[:post_id] )
    critique = @post.critiques.find( params[:id] )
  end

  def update
    @post = Post.find( params[:post_id] )
    critique = @post.critiques.find( params[:id] )

      critique.update({message: params[:message] });

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
