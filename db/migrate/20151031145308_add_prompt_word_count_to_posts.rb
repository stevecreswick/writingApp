class AddPromptWordCountToPosts < ActiveRecord::Migration
  def change
    add_column :posts, :prompt_word_count, :integer
  end
end
