# encoding: UTF-8
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

ActiveRecord::Schema.define(version: 20151031145308) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "challenges", force: :cascade do |t|
    t.integer  "friendship_id"
    t.string   "prompt"
    t.string   "prompt_type"
    t.integer  "word_count"
    t.string   "status"
    t.string   "message"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
    t.string   "sender"
  end

  create_table "critiques", force: :cascade do |t|
    t.integer  "user_id"
    t.text     "message"
    t.integer  "votes"
    t.integer  "post_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "friendships", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "friend_id"
    t.string   "status"
    t.datetime "sent_at"
    t.datetime "accepted_at"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "posts", force: :cascade do |t|
    t.string   "title"
    t.text     "message"
    t.integer  "user_id"
    t.datetime "created_at",        null: false
    t.datetime "updated_at",        null: false
    t.string   "prompt"
    t.string   "prompt_type"
    t.integer  "word_count"
    t.string   "model_url"
    t.string   "genre"
    t.integer  "prompt_word_count"
  end

  create_table "users", force: :cascade do |t|
    t.string   "username"
    t.string   "password_digest"
    t.datetime "created_at",        null: false
    t.datetime "updated_at",        null: false
    t.string   "token"
    t.string   "image_url"
    t.string   "from"
    t.string   "favorite_book"
    t.string   "favorite_author"
    t.string   "favorite_genre"
    t.string   "currently_reading"
    t.string   "about"
    t.string   "writing_goal"
  end

  create_table "writing_prompts", force: :cascade do |t|
    t.string   "prompt"
    t.string   "prompt_type"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.string   "model_url"
  end

end
