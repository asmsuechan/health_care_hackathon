class CreateTabemonos < ActiveRecord::Migration[5.0]
  def change
    create_table :tabemonos do |t|
      t.string :tenmei
      t.string :ryourimei
      t.string :nedan
      t.string :url
      t.string :gazou

      t.timestamps
    end
  end
end
