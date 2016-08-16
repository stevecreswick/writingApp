class AddUserIdToWritingPrompts < ActiveRecord::Migration
  def change
    add_column :writing_prompts, :user_id, :integer
  end
end
