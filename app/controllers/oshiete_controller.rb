class OshieteController < ApplicationController
  protect_from_forgery except: [:register, :recommend]
  # GET oshiete/index
  def index
  end

  # POST oshiete/register
  # { user: { taijuu: "50kg", shincho: "160cm", seibetsu: "male" } }
  def register
    User.create(user_params)
    render json: { status: 301 }
  end

  # POST oshiete/recommend
  # curl localhost:3002/oshiete/recommend -X POST -d "taicho=good"
  # {"id":3,"tenmei":"半睡","ryourimei":"うどん","nedan":"600円","url":"http://r.gnavi.co.jp/1gfwba4s0000/","gazou":"http://uds.gnst.jp/rest/fs_img/1gfwba4s0000/s_1001.jpg","created_at":"2016-11-19T02:29:19.229Z","updated_at":"2016-11-19T02:29:19.229Z"}
  def recommend
    if params[:taicho] == "good"
      tabemono = Tabemono.find_by(ryourimei: "博多もつ鍋")
    elsif params[:taicho] == "bad"
      tabemono = Tabemono.find_by(ryourimei: "うどん")
    else
      tabemono = Tabemono.find_by(ryourimei: "そば")
    end
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
