class AddIpToEvent < ActiveRecord::Migration[5.0]
  def change
    add_column :events, :ip, :string
    add_column :events, :date, :date
  end
end
