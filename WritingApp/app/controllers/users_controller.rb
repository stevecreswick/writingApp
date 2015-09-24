class UsersController < ApplicationController

    include UsersHelper
    include SessionsHelper


  def register
    @user = User.new
  end

  def create

    @user = User.new(user_params)

    if @user.save

      respond_to do |format|

      format.html { redirect_to log_in_path}
      format.json { render json: @user }

      end

    else

    end

  end

  def login
  end

  def profile
    return nil if !authenticate!
    @user = current_user
    render layout: "profile_layout"
  end

  private

  def user_params
    params.require(:user).permit(:username, :password)
  end

end
