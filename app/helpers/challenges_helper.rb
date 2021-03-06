module ChallengesHelper


  def received_challenges
    @received_challenges = []

      current_user.inverse_friendships.each do |inverse_friendship|
        inverse_friendship.challenges.each do |inverse_challenge|
          if inverse_challenge.status == "Open"
          @received_challenges.push( inverse_challenge )
          end
        end
      end

      @received_challenges
  end

  def sent_challenges

    @sent_challenges = []

      current_user.friendships.each do |friendship|
        friendship.challenges.each do |challenge|

          if (challenge.status == "Open")
          @sent_challenges.push(challenge)
          end

        end
      end

    @sent_challenges
  end


    def completed_challenges

      @completed_challenges = []

      current_user.inverse_friendships.each do |friendship|

        friendship.challenges.each do |challenge|

          if challenge.status == "Completed"
            @completed_challenges.push(challenge)
          end

        end

      end

      current_user.friendships.each do |friendship|

        friendship.challenges.each do |challenge|

          if challenge.status == "Completed"
            @completed_challenges.push(challenge)
          end

        end

      end

      @completed_challenges

    end

    def awaiting_challenges

          @awaiting_response = []

          current_user.inverse_friendships.each do |friendship|

            friendship.challenges.each do |challenge|

              if challenge.status == "Accepted"
                @awaiting_response.push(challenge)
              end

            end

          end


          current_user.friendships.each do |friendship|

            friendship.challenges.each do |challenge|

              if challenge.status == "Accepted"
                @awaiting_response.push(challenge)
              end

            end

          end

          @awaiting_response

    end





end
