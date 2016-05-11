class AddMaxValueToRatings < ActiveRecord::Migration
  def change
    add_column :ratings, :max_value, :integer
  end
end
