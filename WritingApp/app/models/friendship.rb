class Friendship < ActiveRecord::Base

belongs_to :user
  belongs_to :friend, :class_name => 'User'

  def self.check_if_friends(user, friend)
      (user.id == friend.id || Friendship.where(user_id: user.id,friend_id: friend.id).present?) ? true : false
  end

    def self.request(user, friend)
      test = check_if_friends(user, friend)
      unless test
        transaction do
          create(:user_id => user.id, :friend_id => friend.id, :status => 'pending')
          create(:user_id => friend.id, :friend_id => user.id, :status => 'requested')
        end
      end
    end

    def self.accept(user, friend)
       transaction do
         accepted_at = Time.now
         accept_one_side(user, friend, accepted_at)
         accept_one_side(friend, user, accepted_at)
        end
     end

   def self.accept_one_side(user, friend, accepted_at)
     request = find_by_user_id_and_friend_id(user, friend)
     request.status = 'accepted'
     request.accepted_at = accepted_at
     request.save!
   end

end
