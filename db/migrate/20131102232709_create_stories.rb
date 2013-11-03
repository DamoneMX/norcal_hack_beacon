class CreateStories < ActiveRecord::Migration
  def change
    create_table :stories do |t|
      t.string :name
      t.string :content
      t.string :origin
      t.string :destination
      t.float :orLat
      t.float :orLng
      t.float :desLat
      t.float :desLng
      t.string :photo

      t.timestamps
    end
  end
end
