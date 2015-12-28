class AddTypeToWritingTips < ActiveRecord::Migration
  def change
    add_column :writing_tips, :type, :string
  end
end
