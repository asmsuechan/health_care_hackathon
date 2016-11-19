Rails.application.routes.draw do
  get 'oshiete/index'
  post 'oshiete/register'
  post 'oshiete/recommend'
  post 'oshiete/houkoku'

  root to: 'welcome#index'
  get 'welcome/index'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
