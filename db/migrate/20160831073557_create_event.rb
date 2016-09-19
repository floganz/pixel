class CreateEvent < ActiveRecord::Migration[5.0]
  def change
    create_table :events do |t|
      t.references :target, foreign_key: true
      t.string :ip
      t.date :date
      t.string :browser
      t.boolean :unique, default: false
    end
  end
end
