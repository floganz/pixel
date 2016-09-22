require 'rails_helper'

RSpec.describe User, type: :model do
  it "Adding valid user" do
    @user = create(:user)
    @user.should be_valid
  end

  it "Email is taken" do
    create(:user, email: "test@test.com")
    expect { create(:user, email: "test@test.com") }.to raise_error ActiveRecord::RecordInvalid
  end

  it "User password less than 6" do
    expect { create(:user, password: "123") }.to raise_error ActiveRecord::RecordInvalid
  end
end
