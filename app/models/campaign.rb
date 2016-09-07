class Campaign < ApplicationRecord
  has_many :targets, :dependent => :delete_all
  has_many :events, through: :targets
  has_one :user

end
