class AddSenderIdToChallenges < ActiveRecord::Migration
  def change
    add_column :challenges, :sender_id, :integer
  end
end
