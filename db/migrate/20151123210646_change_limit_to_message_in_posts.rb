class ChangeLimitToMessageInPosts < ActiveRecord::Migration
  def change
    change_column :posts, :message, :text, :limit => nil
  end
end
