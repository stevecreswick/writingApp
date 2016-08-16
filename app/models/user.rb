class User < ActiveRecord::Base


  has_secure_password
  # validates_uniqueness_of :email, :case_sensitive => false
  validates_uniqueness_of :username, :case_sensitive => false
  validates_uniqueness_of :email

  # Posts & Critiques
  has_many :posts
  has_many :critiques, through: :posts

  # Following
  has_many :friendships
  has_many :friends, :through => :friendships
  has_many :challenges, through: :friendships

  # Followers
  has_many :inverse_friendships, :class_name => "Friendship", :foreign_key => "friend_id"
  has_many :inverse_friends, :through => :inverse_friendships, :source => :user
  # Pending Friendships
  # has_many :pending_friends, -> { where(friendships: { status: "pending"}) }, through: :friendships, source: :friend

  # Ratings and Rated Posts
  has_many :ratings
  has_many :rated_posts, :through => :ratings, :source => :post
  # has_many :posts, through: :ratings, as: :rated_posts

  has_many :votes
  has_many :voted_critiques, :through => :votes, :source => :critique

  has_many :writing_tips


  has_many :tip_votes
  has_many :voted_writing_tips, :through => :tip_votes, :source => :writing_tip


# Prompts
  has_many :writing_prompts

  has_many :prompt_votes
  has_many :voted_writing_prompts, :through => :prompt_votes, :source => :writing_prompt
  # has_many :writing_prompts
  # has_many :prompts_answered, :through => :posts





  before_create :generate_token

  self.per_page = 10



  # Pass in the user and it will return all except that user and its friends

  scope :all_except, ->(user) { where.not(id: (user.friends + [user]).map(&:id))}


  def self.search(user_name)
    if user_name
        user_name.downcase!
        where('LOWER(username) LIKE ?', "%#{user_name}%")
    else
        all
    end
  end


  def potential_friends

    @potential_friends = User.all_except(self)

  end

  def generate_token

    self.token = SecureRandom.urlsafe_base64(nil, false)

  end


  def friend_ids
    ids = []
    self.friendships.map do |friendship|
      ids.push(friendship.friend_id)
    end
      return ids

  end

  def skill(skill)
    @skill = 0

    self.posts.map do |post|
      @skill = @skill + post.skill_rating(skill)
    end

    @skill
  end

end
