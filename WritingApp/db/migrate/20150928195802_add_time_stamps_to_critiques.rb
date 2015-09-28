class AddTimeStampsToCritiques < ActiveRecord::Migration
  def change
    add_column :critiques, :created_at, :datetime
    add_column :critiques, :updated_at, :datetime
  end
end
