class AddPromptToPosts < ActiveRecord::Migration
  def change
    add_column :posts, :prompt, :string
  end
end
