class AddBrowserToEvent < ActiveRecord::Migration[5.0]
  def change
    add_column :events, :browser, :string
  end
end
