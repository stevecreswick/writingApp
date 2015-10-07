class User < ActiveRecord::Base


  has_secure_password

  # Posts & Critiques
  has_many :posts
  has_many :critiques, through: :posts

  # Friends you added
  has_many :friendships
  has_many :friends, :through => :friendships

  # Friends who added you
  has_many :inverse_friendships, :class_name => "Friendship", :foreign_key => "friend_id"
  has_many :inverse_friends, :through => :inverse_friendships, :source => :user

  # Pending Friendships
  has_many :pending_friends, -> { where(friendships: { status: "pending"}) }, through: :friendships, source: :friend
  before_create :generate_token


  def generate_token
    self.token = SecureRandom.urlsafe_base64(nil, false)
  end

end
