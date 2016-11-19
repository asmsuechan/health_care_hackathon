class CreateUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :users do |t|
      t.string :shincho
      t.string :taiju
      t.string :taicho
      t.string :nenrei
      t.string :seibetsu

      t.timestamps
    end
  end
end
