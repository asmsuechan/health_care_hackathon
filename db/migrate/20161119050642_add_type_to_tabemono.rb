class AddTypeToTabemono < ActiveRecord::Migration[5.0]
  def change
    add_column :tabemonos, :genki, :integer
  end
end
