class User < ApplicationRecord
  has_many :campaigns, :dependent => :destroy
  has_many :targets, through: :campaigns
  has_many :events, through: :targets
  
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
end
