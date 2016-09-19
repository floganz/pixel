FactoryGirl.define do
  factory :user do
    sequence(:id) { |i| i }
    sequence(:email) { |i| "email#{i}@test.com"}
    password "123123"
  end
end
