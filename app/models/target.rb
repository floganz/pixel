class Target < ApplicationRecord
  has_one :campaigns
  has_many :events, :dependent => :destroy

  def self.with_count(id)
    @targets = Target.select("targets.id, targets.name, 
      COUNT(case events.unique when 'false' then 1 else null end) as visits,
      COUNT(case events.unique when 'true' then 1 else null end) as unique,
      COUNT(case when events.browser = 'Internet Explorer' AND events.unique = 'true' then 1 else null end) as ie,
      COUNT(case when events.browser = 'Chrome' AND events.unique = 'true' then 1 else null end) as chrome,
      COUNT(case when events.browser = 'Mozilla' AND events.unique = 'true' then 1 else null end) as mozilla,
      COUNT(case when events.browser = 'Safari' AND events.unique = 'true' then 1 else null end) as safari,
      COUNT(case when events.browser = 'Opera' AND events.unique = 'true' then 1 else null end) as opera")
      .joins("LEFT OUTER JOIN events ON events.target_id = targets.id")
      .where(campaign_id: id)
      .group("targets.id")
  end
end
