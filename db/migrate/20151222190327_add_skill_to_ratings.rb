class AddSkillToRatings < ActiveRecord::Migration
  def change
    add_column :ratings, :skill, :string
  end
end
