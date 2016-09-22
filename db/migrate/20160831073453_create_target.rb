class CreateTarget < ActiveRecord::Migration[5.0]
  def change
    create_table :targets do |t|
      t.string :name
      t.references :campaign, foreign_key: true
      t.text :path
    end
  end
end
