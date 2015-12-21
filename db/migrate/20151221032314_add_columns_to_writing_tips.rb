class AddColumnsToWritingTips < ActiveRecord::Migration
  def change
    add_column :writing_tips, :link, :string
    add_column :writing_tips, :description, :text
    add_column :writing_tips, :title, :string
    add_column :writing_tips, :votes, :integer
  end
end
