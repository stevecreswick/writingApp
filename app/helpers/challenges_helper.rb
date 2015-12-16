module ChallengesHelper


  def received_challenges
    @received_challenges = []

      current_user.inverse_friendships.each do |inverse_friendship|
        inverse_friendship.challenges.each do |inverse_challenge|
          @received_challenges.push( inverse_challenge )
        end
      end

      @received_challenges
  end

  def all_challenges

    @all_challenges = []

      current_user.friendships.each do |friendship|
        friendship.challenges.each do |challenge|
          @all_challenges.push(challenge)
        end
      end

    @all_challenges
    end


    def completed_challenges

      @completed_challenges = []

      current_user.friendships.each do |friendship|
        friendship.challenges.each do |challenge|

          if challenge.status == "Accepted"
            @completed_challenges.push(challenge)
          end

        end
      end

      @completed_challenges

    end

end
