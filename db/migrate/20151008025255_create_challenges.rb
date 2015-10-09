class CreateChallenges < ActiveRecord::Migration
  def change
    create_table :challenges do |t|
      t.integer :friendship_id
      t.string :prompt
      t.string :prompt_type
      t.integer :word_count
      t.string :status
      t.string :message

      t.timestamps null: false
    end
  end
end
