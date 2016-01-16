class AddPromptVotes < ActiveRecord::Migration
  def change
    create_table :prompt_votes do |t|
      t.integer :writing_prompt_id
      t.integer :user_id
      t.integer :value

      t.timestamps null: false
    end
  end
end
