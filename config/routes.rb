Rails.application.routes.draw do

  root to: "pages#index"

  devise_for :users, :controllers => {sessions: 'sessions'}
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  
  get 'event.gif', to: 'events#createEvent'
  get 'search_c', to: 'campaigns#search'
  get 'search_t', to: 'targets#search'
  get 'search_c_t', to: 'campaigns#search_t'
  get 'campaigns_t', to: 'campaigns#index_t'

  resources :campaigns, :targets, :events
end
