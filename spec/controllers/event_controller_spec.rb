require 'rails_helper'

RSpec.describe EventsController do
  fixtures :users, :campaigns, :targets, :events

  describe "crud" do
    it "add event response" do
      expected = {
        "Content-Type"=>"image/png", 
        "Content-Disposition"=>"inline; filename=\"pixel.gif\""
      }
      get :createEvent, params: { ip: '172.16.202.110', date: '12.05.2016', target_id: 1}
      response.header.should include(expected)
    end
  end
end
