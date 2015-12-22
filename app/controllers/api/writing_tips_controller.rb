class Api::WritingTipsController < ApplicationController

  include SessionsHelper
  include UsersHelper
  include ActionView::Helpers::DateHelper

  def index
    writing_tips = WritingTip.all

    render json: writing_tips
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
    writing_tip = WritingTip.find(params[:id])
    writing_tip.update(writing_tips_params)
  end

  def delete

    current_api_user!
    writing_tip = WritingTip.find(params[:id])

    if (writing_tip.user_id = current_user.id)
    writing_tip.destroy
    else
    puts 'Not this users writing tip'
    end

  end

  def page
  end

  private

  def writing_tips_params
    params.require(:writing_tip).permit(:title, :link, :description, :tags, :votes)
  end

end
