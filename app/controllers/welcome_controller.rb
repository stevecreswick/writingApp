class WelcomeController < ApplicationController

  include SessionsHelper
  include UsersHelper

def index
  authenticate!
  # @user = current_user
  # render layout: "profile_layout"
end

def welcome
end

end
