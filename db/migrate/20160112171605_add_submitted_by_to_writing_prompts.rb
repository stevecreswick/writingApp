class AddSubmittedByToWritingPrompts < ActiveRecord::Migration
  def change
    add_column :writing_prompts, :submitted_by, :string
  end
end
