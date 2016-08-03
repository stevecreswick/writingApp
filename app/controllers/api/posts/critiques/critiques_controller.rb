class Api::Posts::Critiques::CritiquesController < ApplicationController

  include SessionsHelper
  include UsersHelper
  include Api::Posts::PostsHelper
  include Api::Critiques::CritiquesHelper

  include ActionView::Helpers::DateHelper

  respond_to :html, :json

  # before_action :current_api_user!

  def query
  # Account for Page Starting at 0
  page = params[:page].to_i + 1

  post = Post.find( params[:post_id] )

  ar_critiques = post.critiques.paginate(:page => page).order('created_at DESC')

  critiques = ar_critiques.map do |ar_critique|

    @total_votes = 0

    data = ar_critique.as_json
    author = User.find( ar_critique.user_id )
    data['username'] = author.username
    data['image_url'] = author.image_url

    time = time_ago_in_words(ar_critique.created_at)
    data['created_at'] = time

    ar_critique.votes.map do |vote|
      @total_votes = @total_votes + vote.value
      if vote.user_id = current_user.id
        data['user_voted'] = true
        data['user_vote'] = vote.value
      end
    end

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
    post = Post.find( params[ :post_id ] )
    critique = post.critiques.find( params[ :id ] )
    json_critique = convert_critique( critique )
    render json: json_critique
  end

  def create
    @critique = Critique.new(critique_params)

    if @critique.save
      puts  "Saved successful-like"
      render json: @critique
    else
      puts "Failed to save-or"
      render json: @critique
    end
  end

  def update
    critique = Post.find( params[ :post_id ] ).
                    critiques.
                    find( params[ :id ] )

    critique.update( {
      message: params[ :message ]
    } );

    render json: critique
  end

  def destroy
    post = Post.find( params[ :post_id ] )
    deleted_critique = post.critiques.find( params[ :id ] )
    deleted_critique.destroy

    render json: post.critiques
  end


  def critique_params
    params.require( :critique ).permit( :user_id, :message, :post_id, :votes )
  end
end
