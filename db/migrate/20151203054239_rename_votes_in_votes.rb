class RenameVotesInVotes < ActiveRecord::Migration
  def change
    rename_column :votes, :votes, :value
  end
end
