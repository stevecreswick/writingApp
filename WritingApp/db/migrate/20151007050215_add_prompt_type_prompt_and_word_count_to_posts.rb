class AddPromptTypePromptAndWordCountToPosts < ActiveRecord::Migration
  def change
    add_column :posts, :prompt_type, :string
    add_column :posts, :word_count, :integer
  end
end
