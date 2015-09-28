class WelcomeController < ApplicationController

  include SessionsHelper
  include UsersHelper

def index
  @user = current_user
  render layout: "profile_layout"
end

def show_post
  @post = Post.find( params[:id] )
  @post_author = User.find( @post.user_id )
  @critiques = @post.critiques.all
  @user = current_user
  render layout: "profile_layout"
end

end
