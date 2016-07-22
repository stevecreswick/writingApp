class Api::WritingPromptsController < ApplicationController

  include SessionsHelper
  include UsersHelper
  include Api::Posts::PostsHelper
  include ActionView::Helpers::DateHelper

  def new
  end

  def create
    prompt = WritingPrompt.create(prompt_params)

    render json: prompt
  end

  def index
    prompts = WritingPrompt.all
    randomId = Random.rand( prompts.length )
    prompt = WritingPrompt.find( randomId )

    render json: prompt
  end

  def one_word
    prompts = WritingPrompt.where({prompt_type: "One Word"})
    prompt = prompts.sample

    render json: prompt
  end

  def what_if
    prompts = WritingPrompt.where({prompt_type: "What If"})
    prompt = prompts.sample

    render json: prompt
  end

  def first_sentence
    prompts = WritingPrompt.where({prompt_type: "First Sentence"})
    prompt = prompts.sample

    render json: prompt
  end

  def submitted
    page = params[:page].to_i + 1

    # Add an approved column to writing prompts table
    prompts = WritingPrompt.where({prompt_type: "user-submitted"})

    submitted_prompts = prompts.map do |writing_prompt|

      @total_votes = 0

      writing_prompt.prompt_votes.map do |prompt_vote|
        @total_votes = @total_votes + prompt_vote.value
      end

      data = writing_prompt.as_json

      if @total_votes > 0
      data['total_votes'] = @total_votes
      else
      data['total_votes'] = 0
      end
      data
    end

    render json: submitted_prompts
  end

  def reddit

    post_limit = 25

    response = HTTParty.get("https://www.reddit.com/r/WritingPrompts.json?limit=#{ post_limit }")
    title = response['data']['children'][rand(post_limit)]['data']['title']
    split_title = title.split(' ')

    # Until the post is a writing prompt, keep doing all of this
    until split_title.first == "[WP]" do
      title = response['data']['children'][rand(post_limit)]['data']['title']
      split_title = title.split(' ')
    end

    split_title.shift
    title = split_title.join(' ')
    prompt = { :prompt => title }.to_json

    render json: prompt

  end

  def show

    writing_prompt = WritingPrompt.find( params[:id] )

    @total_votes = 0

    writing_prompt.prompt_votes.map do |prompt_vote|
      @total_votes = @total_votes + prompt_vote.value
    end

    data = writing_prompt.as_json

    if @total_votes > 0
    data['total_votes'] = @total_votes
    else
    data['total_votes'] = 0
    end


    render json: data
  end

  def edit
  end

  def destroy
    current_api_user!
    @deleted_prompt = WritingPrompt.find(params[:id])
    @deleted_prompt.destroy
    render nothing: true
  end


    private

    def prompt_params
      params.require(:writing_prompt).permit(:prompt, :prompt_type, :approved, :submitted_by)
    end


end
