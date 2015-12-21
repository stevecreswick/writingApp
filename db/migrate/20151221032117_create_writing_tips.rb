class CreateWritingTips < ActiveRecord::Migration
  def change
    create_table :writing_tips do |t|
      t.references :user, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
