class OshieteController < ApplicationController
  def index
  end

  def register
    User.create(user_params)
    render json: { status: 301 }
  end

  private

  def user_params
    params.require(:user).permit!
  end
end
