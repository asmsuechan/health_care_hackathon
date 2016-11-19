class OshieteController < ApplicationController
  protect_from_forgery except: [:register, :recommend]
  def index
  end

  def register
    User.create(user_params)
    render json: { status: 301 }
  end

  def recommend
    tabemono = Tabemono.new(tenmei: "アイウエオ", ryourimei: "アイウエオ", nedan: "1000円", url: "hoge.com", gazou: "hoge.com/image.png")
    render json: tabemono
  end

  def houkoku
    if params[:houkoku]
      render json: { sasara: "おめでとう"  }
    else
      render json: { sasara: "は？" }
    end
  end

  private

  def user_params
    params.require(:user).permit!
  end
end
