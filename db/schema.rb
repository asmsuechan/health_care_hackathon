# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20161119050642) do

  create_table "tabemonos", force: :cascade do |t|
    t.string   "tenmei"
    t.string   "ryourimei"
    t.string   "nedan"
    t.string   "url"
    t.string   "gazou"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer  "genki"
  end

  create_table "users", force: :cascade do |t|
    t.string   "shincho"
    t.string   "taiju"
    t.string   "taicho"
    t.string   "nenrei"
    t.string   "seibetsu"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
