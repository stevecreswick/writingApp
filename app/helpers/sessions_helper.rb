module SessionsHelper

  def authenticate!
    if current_user
      redirect_to main_path
      return true
    else
      redirect_to welcome_path
      return false
    end
  end

  def current_user
    if session[:user_id]
      current_user = User.find(session[:user_id])
    end
  end

end
