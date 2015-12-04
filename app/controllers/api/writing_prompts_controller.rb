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
    response = HTTParty.get('https://www.reddit.com/r/WritingPrompts.json?limit=25')
    title = response['data']['children'][rand(25)]['data']['title']
    split_title = title.split(' ')

    # Until the post is a writing prompt, keep doing all of this
    while ( split_title.first != "[WP]" ) do
      title = response['data']['children'][rand(25)]['data']['title']
      split_title = title.split(' ')
    end

    prompt = title.as_json

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
