module Api::Friendships::FriendshipsHelper

def request_friend(user, friend)
  test = check_if_friends(user, friend)
  unless test
    transaction do
      create(:user_id => user.id, :friend_id => friend.id, :status => 'pending')
      create(:user_id => friend.id, :friend_id => user.id, :status => 'requested')
    end
  end
end

def accept_friend(user, friend)
   transaction do
     accepted_at = Time.now
     accept_one_side(user, friend, accepted_at)
     accept_one_side(friend, user, accepted_at)
    end
 end

def accept_one_side(user, friend, accepted_at)
 request = find_by_user_id_and_friend_id(user, friend)
 request.status = 'accepted'
 request.accepted_at = accepted_at
 request.save!
end

end
