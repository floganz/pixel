class CreateEvent < ActiveRecord::Migration[5.0]
  def change
    create_table :events do |t|
      t.references :target, foreign_key: true
    end
  end
end
