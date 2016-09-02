class Campaign < ApplicationRecord
  has_many :targets
  has_many :events, through: :targets
  has_one :user


  # def self.getD(id)
  #   @campaigns = Campaign.select("campaigns.name, campaigns.id as camp_id, targets.id as targ_id,
  #     targets.name, COUNT(events.id) as target_count")
  #                   .joins(:targets)
  #                   .joins(:events)
  #                   .where(user_id: id)
  #                   .group("campaigns.id")
  # end
end
