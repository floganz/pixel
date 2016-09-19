class Target < ApplicationRecord
  has_one :campaigns
  has_many :events, :dependent => :destroy

  validates :name, :uniqueness => true
  validates_with ParentValidator, fields: [:path]

  searchkick searchable: [:name]

  def self.with_count(ids)
    @targets = Target.select("targets.id, targets.name, targets.campaign_id, targets.path,
      COUNT(case events.unique when 'false' then 1 else null end) as visits,
      COUNT(case events.unique when 'true' then 1 else null end) as unique,
      COUNT(case when events.browser = 'Internet Explorer' AND events.unique = 'true' then 1 else null end) as ie,
      COUNT(case when events.browser = 'Chrome' AND events.unique = 'true' then 1 else null end) as chrome,
      COUNT(case when events.browser = 'Mozilla' AND events.unique = 'true' then 1 else null end) as mozilla,
      COUNT(case when events.browser = 'Safari' AND events.unique = 'true' then 1 else null end) as safari,
      COUNT(case when events.browser = 'Opera' AND events.unique = 'true' then 1 else null end) as opera")
      .joins("LEFT OUTER JOIN events ON events.target_id = targets.id")
      .where("targets.campaign_id IN (#{ids})")
      .group("targets.id")
  end

  def self.with_count_2(ids)
    @targets = Target.select("targets.id, targets.name, targets.campaign_id,
      COUNT(case events.unique when 'false' then 1 else null end) as visits,
      COUNT(case events.unique when 'true' then 1 else null end) as unique,
      COUNT(case when events.browser = 'Internet Explorer' AND events.unique = 'true' then 1 else null end) as ie,
      COUNT(case when events.browser = 'Chrome' AND events.unique = 'true' then 1 else null end) as chrome,
      COUNT(case when events.browser = 'Mozilla' AND events.unique = 'true' then 1 else null end) as mozilla,
      COUNT(case when events.browser = 'Safari' AND events.unique = 'true' then 1 else null end) as safari,
      COUNT(case when events.browser = 'Opera' AND events.unique = 'true' then 1 else null end) as opera")
      .joins("LEFT OUTER JOIN events ON events.target_id = targets.id")
      .where("targets.id IN (#{ids})")
      .group("targets.id")
  end

  def self.getStatistics(campaign_id)
    result = []
    branches = Target.with_count("'#{campaign_id}'")
      .map do |t|
        {
          :name => t.name,
          :path => t.path,
          :data => [t.unique]
        } 
      end
      .group_by { |t| t[:path].try(:[],/\d+/) }
    branches.each do |b|
      if b[1].length > 1
        result.push b[1].sort_by { |i| i[:path].length }
      end
    end
    result
  end
end
