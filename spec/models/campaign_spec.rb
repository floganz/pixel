require 'rails_helper'

RSpec.describe Campaign, type: :model do
  fixtures :users, :campaigns
  # Valid
  it "Adding valid record" do
    @campaign = Campaign.new(
      id: 3,
      user_id: 1,
      name: 'third')
    # create(:user)
    # @campaign = create(:campaign)
    @campaign.should be_valid
  end
  # Name is taken
  it "Record have invalid name" do
    @campaign = Campaign.new(
      id: 3,
      user_id: 1,
      name: 'first')
    # create(:user, id: 1)
    # create(:campaign, name: "campaign 1")
    # @campaign = build(:campaign, name: "campaign 1")
    @campaign.should_not be_valid
  end
  # User doesnt exist
  it "Record have invalid user_id" do
    expect { @campaign = create(:campaign, user_id: '0') }.to raise_error ActiveRecord::InvalidForeignKey
  end
end
