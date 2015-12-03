class RenameVotesInCritiques < ActiveRecord::Migration
  def change
    rename_column :critiques, :votes, :total_votes    
  end
end
