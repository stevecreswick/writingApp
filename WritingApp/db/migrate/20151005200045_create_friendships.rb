class CreateFriendships < ActiveRecord::Migration
  def change
    create_table :friendships do |t|
      t.integer :user_id
      t.integer :friend_id
      t.string :status
      t.datetime :sent_at
      t.datetime :accepted_at

      t.timestamps null: false
    end
  end
end
