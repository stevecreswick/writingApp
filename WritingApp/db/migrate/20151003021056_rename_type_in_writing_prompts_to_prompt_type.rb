class RenameTypeInWritingPromptsToPromptType < ActiveRecord::Migration
  def change
    rename_column :writing_prompts, :type, :prompt_type
  end
end
