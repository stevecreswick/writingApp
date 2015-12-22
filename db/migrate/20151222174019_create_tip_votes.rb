class CreateTipVotes < ActiveRecord::Migration
  def change
    create_table :tip_votes do |t|
      t.integer :writing_tip_id
      t.integer :user_id
      t.integer :value

      t.timestamps null: false
    end
  end
end
