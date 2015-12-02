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
    get '/posts/paginated/:genre/:page' => 'posts#paginated'

    get '/posts/sorted/:genre' => 'posts#genre'
    get '/posts/:id' => 'posts#show'
    get '/users/:user_id/posts' => 'posts#user_posts'
    post '/posts' => 'posts#create'
    delete '/posts/:id' => 'posts#destroy'
    get '/posts/:id/edit' => 'posts#edit'
    put '/posts/:id' => 'posts#update'

    # Post Ratings
    post '/posts/:id/ratings' => 'ratings#create'
    get '/posts/:id/ratings' => 'ratings#user_rating'

    # Critique API
    get '/posts/:post_id/critiques' => 'critiques#index'
    post '/posts/:post_id/critiques' => 'critiques#create'
    delete '/posts/:post_id/critiques/:id' => 'critiques#destroy'
    put '/posts/:post_id/critiques/:id' => 'critiques#update'

    # Critique Votes
    post '/posts/:post_id/critiques/:id/votes' => 'votes#create'
    get '/posts/:post_id/critiques/:id/votes' => 'votes#user_vote'

    # Writing Prompt API
    get '/writing_prompts' => 'writing_prompts#index'
    get '/writing_prompts/one_word' => 'writing_prompts#one_word'
    get '/writing_prompts/what_if' => 'writing_prompts#what_if'
    get '/writing_prompts/first_sentence' => 'writing_prompts#first_sentence'


    # Friendships API
    get'/friendships' => 'friendships#index', as: :friends
    get'/friendships/pending' => 'friendships#pending'
    post'/friendships/:friend_id' => 'friendships#create', as: :new_friend
    delete'/friendships/:friend_id' => 'friendships#destroy', as: :remove_friend
    get '/friendships/:id/challenges' => 'challenges#index'
    get '/friendships/:id/challenges/:challenge_id' => 'challenges#show'
    post '/friendships/:id/challenges' => 'challenges#create'
    delete '/friendships/:id/challenges/:challenge_id' => 'challenges#destroy'
    put '/friendships/:id/challenges/:challenge_id' => 'challenges#update'

    get '/challenges/received' => 'challenges#received'
    put '/friendships/:id/challenges/:challenge_id' => 'challenges#update'


  end

# User Routes
get '/users' => 'users#index', as: :users
get '/users/register' => 'users#register', as: :register
post '/users' => 'users#create'
get '/users/login' => 'users#login', as: :log_in
get '/users/profile/:id' => 'users#profile', as: :profile
get '/users/show/:id' => 'users#show', as: :show
get '/users/main' => 'users#main', as: :main
get '/users/edit' => 'users#edit', as: :edit
put '/users/:id' => 'users#update'



get '/users/:user_id/posts/:post_id' => 'users#show_post'
get '/users/friends' => 'users#friends'
get '/users/add_friends/:page' => 'users#add_friends'
get '/users/followers' => 'users#followers'
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
