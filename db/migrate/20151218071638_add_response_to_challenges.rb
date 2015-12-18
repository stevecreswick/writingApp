class AddResponseToChallenges < ActiveRecord::Migration
  def change
    add_column :challenges, :response, :text
  end
end
