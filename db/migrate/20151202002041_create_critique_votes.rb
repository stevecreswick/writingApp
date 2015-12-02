class CreateCritiqueVotes < ActiveRecord::Migration
  def change
    create_table :critique_votes do |t|
      t.integer :user_id
      t.integer :critique_id
      t.integer :votes

      t.timestamps null: false
    end
  end
end
