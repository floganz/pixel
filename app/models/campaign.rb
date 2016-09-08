class Campaign < ApplicationRecord
  has_many :events, through: :targets
  has_many :targets, :dependent => :destroy 
  has_one :user

end
