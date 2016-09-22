require 'rails_helper'

RSpec.describe Campaign, type: :model do
  it "Adding valid record" do
    create(:user)
    @campaign = create(:campaign)
    @campaign.should be_valid
  end

  it "Record have invalid name" do
    create(:user, id: 1)
    create(:campaign, name: "campaign 1")
    @campaign = build(:campaign, name: "campaign 1")
    @campaign.should_not be_valid
  end

  it "Record have invalid user_id" do
    expect { @campaign = create(:campaign, user_id: '0') }.to raise_error ActiveRecord::InvalidForeignKey
  end
end
