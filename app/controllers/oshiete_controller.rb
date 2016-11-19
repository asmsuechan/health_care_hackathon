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
    # 登録者が女の人の場合と男の人の場合で分岐するなどしたほうがいい
    # current_userとかのヘルパーが必要になるのでとりあえず没
    # tabemono = Tabemono.new(tenmei: "巴庵", ryourimei: "博多もつ鍋", nedan: "1200円", url: "http://r.gnavi.co.jp/hv1uvs430000", gazou: "http://uds.gnst.jp/rest/img/hv1uvs430000/t_0004.jpg?t=1403672613&g=157")
    tabemono = Tabemono.all.sample
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
