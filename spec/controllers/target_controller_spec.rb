require 'rails_helper'

RSpec.describe TargetsController do
  fixtures :users, :campaigns, :targets, :events

  describe "methods" do
    it "stats" do
      @resp = [
                [
                 {"name":"1","path":"1","data":[2]},
                 {"name":"3","path":"1.3","data":[2]},
                 {"name":"5","path":"1.3.5","data":[0]}
                ], 
                [
                 {"name":"2","path":"2","data":[2]}, 
                 {"name":"4","path":"2.4","data":[1]},
                 {"name":"6","path":"2.4.6","data":[0]}
                ]
              ]
      @resp2 = [
                [
                 {"name":"2","path":"2","data":[2]}, 
                 {"name":"4","path":"2.4","data":[1]},
                 {"name":"6","path":"2.4.6","data":[0]}
                ], 
                [
                 {"name":"1","path":"1","data":[2]},
                 {"name":"3","path":"1.3","data":[2]},
                 {"name":"5","path":"1.3.5","data":[0]}
                ]
              ]
      get :stats, params: { campaign_id: 1 }
      response.body.should == @resp2.to_json
    end

    it "index" do
      expected = [
        {id:1,name:"1",campaign_id:1,path:"1",visits:3,unique:2,ie:0,chrome:1,mozilla:1,safari:0,opera:0},
        {id:2,name:"2",campaign_id:1,path:"2",visits:0,unique:2,ie:0,chrome:0,mozilla:2,safari:0,opera:0},
        {id:3,name:"3",campaign_id:1,path:"1.3",visits:0,unique:2,ie:0,chrome:0,mozilla:2,safari:0,opera:0},
        {id:4,name:"4",campaign_id:1,path:"2.4",visits:0,unique:1,ie:0,chrome:0,mozilla:1,safari:0,opera:0},
        {id:5,name:"5",campaign_id:1,path:"1.3.5",visits:0,unique:0,ie:0,chrome:0,mozilla:0,safari:0,opera:0},
        {id:6,name:"6",campaign_id:1,path:"2.4.6",visits:0,unique:0,ie:0,chrome:0,mozilla:0,safari:0,opera:0},
        {id:7,name:"7",campaign_id:1,path:"7",visits:0,unique:0,ie:0,chrome:0,mozilla:0,safari:0,opera:0}
      ]
      get :index, params: { campaign_id: 1, offset: 0, limit: 12 }
      response.body.should == expected.to_json
    end

    it "search" do
      expected = [
        {id:1,name:"1",campaign_id:1,visits:3,unique:2,ie:0,chrome:1,mozilla:1,safari:0,opera:0}
      ]
      get :search, params: { campaign_id: 1, q: "1", offset: 0, limit: 12 }
      response.body.should == expected.to_json
    end
  end

  describe "CRUD" do
    it "add valid record" do
      expected = {
        success:true,
        info:"created",
        target: {
          id:23,
          path:"23",
          name:"XXX",
          campaign_id:1
        }
      }
      post :create, target: {name: "XXX", campaign_id: 1} 
      response.body.should == expected.to_json
    end

    it "add invalid record(name)" do
      expected = {
        success: false,
        info: "create fail"
      }
      post :create, target: {name: "1", campaign_id: 1} 
      response.body.should == expected.to_json
    end

    it "add invalid record(parent in middle chain)" do
      expected = {
        success: false,
        info: "create fail"
      }
      post :create, target: {name: "1", campaign_id: 1, path: "2"} 
      response.body.should == expected.to_json
    end

    it "update valid record" do
      expected = {
        success:true,
        info:"updated",
        target: {
          id:1,
          name:"ZZZ",
          path:"1",
          campaign_id:1
        }
      }
      process :update, method: :patch, params: { id: 1, target: { name: "ZZZ" } }
      response.body.should == expected.to_json
    end

    it "update invalid record(name is taken)" do
      expected = {
        success: false,
        info: "update fail"
      }
      process :update, method: :patch, params: { id: 1, target: { name: "2" } }
      response.body.should == expected.to_json
    end
  end
end