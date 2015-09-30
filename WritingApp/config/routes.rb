Rails.application.routes.draw do

  get 'writing_prompts/new'

  get 'writing_prompts/index'

  get 'writing_prompts/edit'

  get 'writing_prompts/destroy'

  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  root 'welcome#index'

  get '/posts/:id' => 'welcome#show_post', as: :show_post


  namespace :api do
    get '/posts' => 'posts#index'
    get '/posts/all' => 'posts#allposts'
    delete '/posts/all/:id' => 'posts#destroy'
    get '/posts/:id' => 'posts#show'
    post '/posts' => 'posts#create'
    delete '/posts/:id' => 'posts#destroy'
    get '/posts/:id/edit' => 'posts#edit'
    put '/posts/:id' => 'posts#update'

    post '/posts/:post_id/critiques' => 'critiques#create'
    get '/posts/:post_id/critiques' => 'critiques#index'

  # resources :posts, except: [:new, :edit]
  end

get '/users/register' => 'users#register', as: :register
post '/users' => 'users#create'
get '/users/login' => 'users#login', as: :log_in
get '/users/profile' => 'users#profile', as: :profile



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
