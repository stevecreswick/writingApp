class AddScoresToUsers < ActiveRecord::Migration
  def change
    add_column :users, :writer_score, :integer
    add_column :users, :reviewer_score, :integer
  end
end
