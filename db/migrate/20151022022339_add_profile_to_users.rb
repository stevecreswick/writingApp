class AddProfileToUsers < ActiveRecord::Migration
  def change
    add_column :users, :from, :string
    add_column :users, :favorite_book, :string
    add_column :users, :favorite_author, :string
    add_column :users, :favorite_genre, :string
    add_column :users, :currently_reading, :string
    add_column :users, :about, :string
    add_column :users, :writing_goal, :string
  end
end
