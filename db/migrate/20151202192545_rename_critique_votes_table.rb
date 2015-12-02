class RenameCritiqueVotesTable < ActiveRecord::Migration
  def change
  rename_table :critique_votes, :votes
  end
end
