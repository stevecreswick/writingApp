Rails.application.routes.draw do


  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  root 'welcome#index', as: :index

  # Landing Page for Logged Out Users
  get '/welcome' => 'welcome#welcome', as: :welcome

# API Routes
  namespace :api do

    # Post API
    get '/posts' => 'posts#index'
    get '/posts/:id' => 'posts#show'
    post '/posts' => 'posts#create'
    delete '/posts/:id' => 'posts#destroy'
    get '/posts/:id/edit' => 'posts#edit'
    put '/posts/:id' => 'posts#update'

    # Critique API
    get '/posts/:post_id/critiques' => 'critiques#index'
    post '/posts/:post_id/critiques' => 'critiques#create'
    delete '/posts/:post_id/critiques/:id' => 'critiques#destroy'

    # Writing Prompt API
    get '/writing_prompts' => 'writing_prompts#index'

    # Friendships API
    get'/friendships' => 'friendships#index'
    
  end

# User Routes
get '/users/register' => 'users#register', as: :register
post '/users' => 'users#create'
get '/users/login' => 'users#login', as: :log_in
get '/users/profile' => 'users#profile', as: :profile
get '/users/main' => 'users#main', as: :main
get '/users/:user_id/posts/:post_id' => 'users#show_post'
get '/users/friends' => 'users#friends'
post '/users/request' => 'users#request'




# Session Routes
post '/sessions' => 'sessions#create'
delete '/sessions' => 'sessions#destroy'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
