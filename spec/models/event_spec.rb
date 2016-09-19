require 'rails_helper'

RSpec.describe Event, type: :model do
  fixtures :users, :campaigns, :targets, :events
  # Valid
  it "Adding valid record" do
    @event = Event.new(
      id: 8,
      target_id: 1,
      unique: true,
      browser: 'Chrome')

    @event.should be_valid
  end
  # unique is taken
  it "Record is unique" do
    @event = Event.is_unique?(
      '172.16.202.112',
      '16.05.2016',
      1
    )

    @event.should == true
  end
  # unique is not unique
  it "Record is not unique" do
    @event = Event.is_unique?(
      '172.16.202.110',
      '16.05.2016',
      1
    )

    @event.should == false
  end
end
