class AddApprovedToPrompts < ActiveRecord::Migration
  def change
    add_column :writing_prompts, :approved, :boolean
  end
end
