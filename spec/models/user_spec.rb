require 'rails_helper'

RSpec.describe User, type: :model do
  fixtures :users
  # Valid
  it "Adding valid user" do
    @user = User.new(
      id: 3,
      email: 'test0@test.com',
      password: '123123')

    @user.should be_valid
  end
  # Email is taken
  it "Email is taken" do
    @user = User.new(
      id: 3,
      email: 'test1@test.com',
      password: '123123')

    @user.should_not be_valid
  end
  # password is less than 6
  it "User password less than 6" do
    @user = User.new(
      id: 3,
      email: 'test2@test.com',
      password: '123')
    
    @user.should_not be_valid
  end
end
