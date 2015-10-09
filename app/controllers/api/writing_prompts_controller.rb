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

  def show
    prompt = WritingPrompt.find( params[:id] )
    render json: prompt
  end

  def edit
  end

  def destroy
  end

end
