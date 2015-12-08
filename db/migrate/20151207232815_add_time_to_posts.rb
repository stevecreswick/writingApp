class AddTimeToPosts < ActiveRecord::Migration
  def change
    add_column :posts, :time_completed, :integer
  end
end
