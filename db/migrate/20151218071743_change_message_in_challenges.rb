class ChangeMessageInChallenges < ActiveRecord::Migration
  def change
    change_column :challenges, :message, :text
  end
end
