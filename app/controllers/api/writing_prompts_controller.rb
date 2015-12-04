class Api::WritingPromptsController < ApplicationController

  def new
  end

  def create
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
    prompt = WritingPrompt.find( params[:id] )
    render json: prompt
  end

  def edit
  end

  def destroy
  end

end
