class User < ActiveRecord::Base


  has_secure_password
  has_many :posts
  has_many :critiques, through: :posts

  has_many :friendships
  has_many :friends, :through => :friendships

  has_many :pending_friends, -> { where(friendships: { status: "pending"}) }, through: :friendships, source: :friend
  before_create :generate_token


  def generate_token
    self.token = SecureRandom.urlsafe_base64(nil, false)
  end

end
