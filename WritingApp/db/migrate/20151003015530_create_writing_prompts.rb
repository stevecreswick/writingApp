class CreateWritingPrompts < ActiveRecord::Migration
  def change
    create_table :writing_prompts do |t|
      t.string :prompt
      t.string :type
      t.timestamps null: false
    end
  end
end
