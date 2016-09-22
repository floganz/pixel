class CreateCampaign < ActiveRecord::Migration[5.0]
  def change
    create_table :campaigns do |t|
      t.string :name
      t.references :user, foreign_key: true
    end
  end
end
