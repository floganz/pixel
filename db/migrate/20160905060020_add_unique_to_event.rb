class AddUniqueToEvent < ActiveRecord::Migration[5.0]
  def change
    add_column :events, :unique, :bool, default: false
  end
end
