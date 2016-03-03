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
    get '/posts/users/:user_id' => 'posts#user_posts'
    post '/posts' => 'posts#create'
    delete '/posts/:id' => 'posts#destroy'
    get '/posts/:id/edit' => 'posts#edit'
    put '/posts/:id' => 'posts#update'

    # Post Ratings
    post '/posts/:id/ratings' => 'ratings#create'
    get '/posts/:id/ratings' => 'ratings#user_rating'

    # Critique API
    get '/posts/:post_id/critiques' => 'critiques#index'
    get '/posts/:post_id/critiques/page/:page' => 'critiques#page'
    get '/posts/:post_id/critiques/:id' => 'critiques#show'
    post '/posts/:post_id/critiques' => 'critiques#create'
    delete '/posts/:post_id/critiques/:id' => 'critiques#destroy'
    put '/posts/:post_id/critiques/:id' => 'critiques#update'

    # Critique Votes
    post '/posts/:post_id/critiques/:id/votes' => 'votes#create'
    get '/posts/:post_id/critiques/:id/votes' => 'votes#user_vote'

    # Writing Prompt API
    get '/writing_prompts' => 'writing_prompts#index'
    get '/writing_prompts/show/:id' => 'writing_prompts#show'
    post '/writing_prompts' => 'writing_prompts#create'
    delete '/writing_prompts/:id' => 'writing_prompts#destroy'
    get '/writing_prompts/one_word' => 'writing_prompts#one_word'
    get '/writing_prompts/what_if' => 'writing_prompts#what_if'
    get '/writing_prompts/first_sentence' => 'writing_prompts#first_sentence'
    get '/writing_prompts/reddit' => 'writing_prompts#reddit'
    get '/writing_prompts/writeaway/page/:page' => 'writing_prompts#submitted'


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

    post '/friends/:friend_id/challenges' => 'challenges#create_friend'

    get '/challenges/received/:page' => 'challenges#received'
    get '/challenges/completed/:page' => 'challenges#completed'
    get '/challenges/sent/:page' => 'challenges#sent'
    get '/challenges/awaiting/:page' => 'challenges#awaiting_response'




    put '/friendships/:id/challenges/:challenge_id' => 'challenges#update'

    # Tip Votes
    post '/writing_tips/:id/tip_votes' => 'tip_votes#create'
    # get '/posts/:post_id/critiques/:id/tip_votes' => 'tip_votes#user_vote'

    # Prompt Votes
    post '/writing_prompts/:id/prompt_votes' => 'prompt_votes#create'


    # Writing Tips

      get '/writing_tips' => 'writing_tips#index'
      get '/writing_tips/sorted/:type/:page' => 'writing_tips#sorted'


      get '/writing_tips/:id' => 'writing_tips#show'

      get '/writing_tips/edit' => 'writing_tips#edit'

      put '/writing_tips/:id' => 'writing_tips#update'

      get '/writing_tips/new' => 'writing_tips#new'

      post '/writing_tips' => 'writing_tips#create'

      delete '/writing_tips/:id' => 'writing_tips#delete'

      get '/writing_tips/page/:page' => 'writing_tips#page'

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
get '/users/search/:search/:page' => 'users#search'

put '/users/:id' => 'users#update'


get '/users/:user_id/posts/:post_id' => 'users#show_post'

get '/users/friends/:page' => 'users#friends'
get '/users/all_friends' => 'users#all_friends'
get '/users/add_friends/:page' => 'users#add_friends', as: :add_friends
get '/users/leaderboard/:page' => 'users#writers_leaderboard', as: :leaderboard
get '/users/top_readers/:page' => 'users#readers_leaderboard'

get '/users/followers/:page' => 'users#followers'


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
