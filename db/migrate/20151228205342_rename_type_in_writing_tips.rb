class RenameTypeInWritingTips < ActiveRecord::Migration
  def change
    rename_column :writing_tips, :type, :resource_type
  end
end
