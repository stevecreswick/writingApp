module Api::Critiques::CritiquesHelper

  def convert_critique( critique )

    total_votes = 0

    data = critique.as_json
    author = User.find( critique.user_id )
    data[ 'username' ] = author.username
    data[ 'image_url' ] = author.image_url

    critique.votes.map do |vote|
      total_votes = total_votes + vote.value
      if vote.user_id = current_user.id
        data[ 'user_voted' ] = true
        data[ 'user_vote' ] = vote.value
      end
    end

    if ( total_votes > 0 )
    data[ 'total_votes' ] = total_votes
    else
    data[ 'total_votes' ] = 0
    end

    return data;
  end
end
