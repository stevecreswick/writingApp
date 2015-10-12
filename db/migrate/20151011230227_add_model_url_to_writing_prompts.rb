class AddModelUrlToWritingPrompts < ActiveRecord::Migration
  def change
    add_column :writing_prompts, :model_url, :string
  end
end
