class OshieteController < ApplicationController
  protect_from_forgery except: [:register, :recommend]
  # GET oshiete/index
  def index
  end

  # POST oshiete/register
  def register
    User.create(user_params)
    render json: { status: 301 }
  end

  # POST oshiete/recommend
  def recommend
    tabemono = Tabemono.new(tenmei: "アイウエオ", ryourimei: "アイウエオ", nedan: "1000円", url: "hoge.com", gazou: "hoge.com/image.png")
    render json: tabemono
  end

  # POST oshiete/houkoku
  def houkoku
    if params[:houkoku]
      render json: { status: "ok" }
    else
      render json: { sasara: "ng" }
    end
  end

  private

  def user_params
    params.require(:user).permit!
  end
end
