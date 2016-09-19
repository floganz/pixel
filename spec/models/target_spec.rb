require 'rails_helper'

RSpec.describe Target, type: :model do
  fixtures :users, :campaigns, :targets, :events
  # Valid
  it "Adding valid record" do
    @target = Target.new(
      id: 8,
      campaign_id: 1,
      name: '8',
      path: '8')

    @target.should be_valid
  end
  # Name is taken
  it "Record have invalid name" do
    @target = Target.new(
      id: 8,
      campaign_id: 1,
      name: '1',
      path: '8')

    @target.should_not be_valid
  end
  # Parent already have children
  it "Parent already have children" do
    @target = Target.new(
      id: 8,
      campaign_id: 1,
      name: '8',
      path: '1')

    @target.should_not be_valid
  end
  # Add second target ic chain
  it "Add second target in chain" do
    @target = Target.new(
      id: 8,
      campaign_id: 1,
      name: '8',
      path: '5')

    @target.should be_valid
  end
  # Trying to add second target in middle chain
  it "Trying to add second target in middle chain" do
    @target = Target.new(
      id: 8,
      campaign_id: 1,
      name: '8',
      path: '3')

    @target.should_not be_valid
  end
  # Check visits count
  # it "Check visits count" do
  #   @target = Target.with_count('1')
  #   p @target
  #   @target.should_not be_valid
  # end
end
