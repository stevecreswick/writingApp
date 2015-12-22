class AddTagsToWritingTips < ActiveRecord::Migration
  def change
    add_column :writing_tips, :tags, :string
  end
end
