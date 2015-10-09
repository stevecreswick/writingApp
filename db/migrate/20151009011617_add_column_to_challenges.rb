class AddColumnToChallenges < ActiveRecord::Migration
  def change
    add_column :challenges, :sender, :string
  end
end
