class AddModelUrlToPosts < ActiveRecord::Migration
  def change
    add_column :posts, :model_url, :string
  end
end
