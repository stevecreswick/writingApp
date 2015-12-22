class Api::WritingTipsController < ApplicationController

  include SessionsHelper
  include UsersHelper
  include Api::PostsHelper

  include ActionView::Helpers::DateHelper

  def index
    writing_tips = WritingTip.all

    tips = writing_tips.map do |tip|
      data = tip.as_json
      data['total_votes'] = tip.total_votes
      data
    end

    render json: tips
  end

  def show
    writing_tip = WritingTip.find(params[:id])

    render json: writing_tip
  end

  def edit
    writing_tip = WritingTip.find(params[:id])

  end

  def new

  end

  def create
    current_user.writing_tips.create(writing_tips_params)
    render json: current_user.writing_tips
  end

  def update
    tip = current_user.writing_tips.find(params[:id])
    tip.update({
      title: params["title"],
      link: params["link"],
      description: params["description"],
      tags: params["tags"]
      })

    render json: tip
  end

  def delete

    current_api_user!
    writing_tip = WritingTip.find(params[:id])

    if (writing_tip.user_id = current_user.id)
    writing_tip.destroy
    else
    puts 'Not this users writing tip'
    end

    render :nothing => true, :status => 202
  end

  def page
  end

  private

  def writing_tips_params
    params.require(:writing_tip).permit(:title, :link, :description, :tags, :votes, :user_id)
  end

end
