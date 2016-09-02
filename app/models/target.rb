class Target < ApplicationRecord
  has_one :campaigns
  has_many :events

  def self.with_count(id)
    @targets = Target.select("targets.id, targets.name, COUNT(events.id) as count")
      .joins("LEFT OUTER JOIN events ON events.target_id = targets.id")
      .where(campaign_id: id)
      .group("targets.id")
  end
end
