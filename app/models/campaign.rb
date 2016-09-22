class Campaign < ApplicationRecord
  has_many :events, through: :targets
  has_many :targets, :dependent => :destroy 
  has_one :user

  # validates :name, :uniqueness => true
  validates_uniqueness_of :name, scope: :user_id

  searchkick searchable: [:name]

  def self.with_targets(campaigns)
    ids = []
    campaigns.each { |c| ids.push c.id }
    if ids.length == 0 
      return []
    end
    targets = Target.with_count("'#{ids.join("','")}'").group_by {|r| r.campaign_id }
    z = campaigns.map do |q|
      {
        :id => q.id,
        :name => q.name,
        :targets => targets[q.id].try(:[], 0..11)
      }
    end
  end
end
