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
      tabemono = Tabemono.good.sample
    elsif params[:taicho] == "bad"
      tabemono = Tabemono.normal.sample
    else
      tabemono = Tabemono.normal.sample
    end
    render json: tabemono
  end

  # POST oshiete/houkoku
  def houkoku
    if params[:houkoku] == "ok"
      render json: { sasara: "ちゃんとささらの言うこと聞いてくれたんだね！", sound: "", image: "http://healthcare-20161119.s3-website-ap-northeast-1.amazonaws.com/sasara_dai/sasara_smile.png" }
    else
      render json: { sasara: "せっかくアドバイスしてあげたのに・・・", sound: "", image: "http://healthcare-20161119.s3-website-ap-northeast-1.amazonaws.com/sasara_dai/sasara_sad.png" }
    end
  end

  private

  def user_params
    params.require(:user).permit!
  end
end
