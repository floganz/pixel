class User < ApplicationRecord
  has_many :campaigns
  has_many :targets, through: :campaigns
  has_many :events, through: :targets
  
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
end
