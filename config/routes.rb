Rails.application.routes.draw do

  root to: "pages#index"

  devise_for :users, :controllers => {sessions: 'sessions'}
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  
  # get 'get_campaigns', to: 'campaigns#getData'
  # get 'get_campaign', to: 'campaigns#getOne'
  # get 'get_targets', to: 'targets#getData'
  get 'event.gif', to: 'events#createEvent'

  resources :campaigns, :targets, :events
end
