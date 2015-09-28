class CreateCritiques < ActiveRecord::Migration
  def change
    create_table :critiques do |t|
      t.integer :user_id
      t.text :message
      t.integer :votes
      t.integer :post_id
    end
  end
end
