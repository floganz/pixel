require 'rails_helper'

RSpec.describe CampaignsController do
  fixtures :users, :campaigns, :targets, :events

  describe "CRUD" do
    it "add valid record" do
      @request.env["devise.mapping"] = Devise.mappings[:user]
      user = FactoryGirl.create(:user, id: 3)
      sign_in user
      @campaign = {
        success: true,
        info: "created",
        campaign: {
          id: 5,
          name: "third",
          user_id: 3
        }
      }
      post :create, campaign: {name: "third"}
      response.body.should == @campaign.to_json
    end

    it "add invalid record" do
      @request.env["devise.mapping"] = Devise.mappings[:user]
      user = FactoryGirl.create(:user, id: 3)
      sign_in user
      @campaign = {
        success: false,
        info: "create fail"
      }
      create(:campaign, { name: "first", user_id: 3})
      post :create, campaign: {name: "first"}
      response.body.should == @campaign.to_json
    end

    it "update record" do
      @campaign = {
        success: true,
        info: "updated",
        campaign: {
          id: 1,
          name: "fourth",
          user_id: 1
        }
      }
      process :update, method: :patch, params:  { id: 1, campaign: {name: "fourth", user_id: 1} }
      response.body.should == @campaign.to_json
    end

    it "update record to invalid" do
      expected = {
        success: false,
        info: "update fail"
      }
      process :update, method: :patch, params: { id: 1, campaign: {name: "second"} }
      response.body.should == expected.to_json
    end
  end

  describe "Methods" do
    it "#index" do
      expected = [
        {
          id:1,
          name:"first",
          targets: [
            {id:6,name:"6",campaign_id:1,path:"2.4.6",visits:0,unique:0,ie:0,chrome:0,mozilla:0,safari:0,opera:0},
            {id:7,name:"7",campaign_id:1,path:"7",visits:0,unique:0,ie:0,chrome:0,mozilla:0,safari:0,opera:0},
            {id:2,name:"2",campaign_id:1,path:"2",visits:0,unique:2,ie:0,chrome:0,mozilla:2,safari:0,opera:0},
            {id:5,name:"5",campaign_id:1,path:"1.3.5",visits:0,unique:0,ie:0,chrome:0,mozilla:0,safari:0,opera:0},
            {id:4,name:"4",campaign_id:1,path:"2.4",visits:0,unique:1,ie:0,chrome:0,mozilla:1,safari:0,opera:0},
            {id:1,name:"1",campaign_id:1,path:"1",visits:3,unique:2,ie:0,chrome:1,mozilla:1,safari:0,opera:0},
            {id:3,name:"3",campaign_id:1,path:"1.3",visits:0,unique:2,ie:0,chrome:0,mozilla:2,safari:0,opera:0}
          ]
        },
        {
          id:2,
          name:"second",
          targets: [
            {id:20,name:"20",campaign_id:2,path:"20",visits:0,unique:0,ie:0,chrome:0,mozilla:0,safari:0,opera:0}
          ]
        },
        {
          id:3,
          name:"seconz",
          targets: [
            {id:21,name:"21",campaign_id:3,path:"21",visits:0,unique:0,ie:0,chrome:0,mozilla:0,safari:0,opera:0}
          ]
        },
        {
          id:4,
          name:"seconv",
          targets: [
            {id:22,name:"22",campaign_id:4,path:"22",visits:0,unique:0,ie:0,chrome:0,mozilla:0,safari:0,opera:0}
          ]
        }
      ]
      get :index, user_id: 1
      response.body.should == expected.to_json
    end

    it "search" do
      expected = [
        {
          id:2,
          name:"second",
          targets: [
            {id:20,name:"20",campaign_id:2,path:"20",visits:0,unique:0,ie:0,chrome:0,mozilla:0,safari:0,opera:0}
          ]
        },
        {
          id:3,
          name:"seconz",
          targets: [
            {id:21,name:"21",campaign_id:3,path:"21",visits:0,unique:0,ie:0,chrome:0,mozilla:0,safari:0,opera:0}
          ]
        },
        {
          id:4,
          name:"seconv",
          targets: [
            {id:22,name:"22",campaign_id:4,path:"22",visits:0,unique:0,ie:0,chrome:0,mozilla:0,safari:0,opera:0}
          ]
        }
      ]
      get :search, params: { user_id: 1, q: "seco", offset: 0, limit: 12 }
      response.body.should == expected.to_json
    end

    it "search no results" do
      expected = []
      get :search, params: { user_id: 1, q: "k", offset: 0, limit: 12 }
      response.body.should == expected.to_json
    end

    it "show" do
      expected = {
        id:1,
        name:"first",
        user_id:1
      }
      get :show, id: 1
      response.body.should == expected.to_json
    end
  end
end