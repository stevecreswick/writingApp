class CreateRatings < ActiveRecord::Migration
  def change
    create_table :ratings do |t|
      t.string :user_id
      t.string :post_id
      t.integer :value

      t.timestamps null: false
    end
  end
end
