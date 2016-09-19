FactoryGirl.define do
  factory :campaign do
    sequence(:name) { |i| "campaign #{i}"}
    user_id 1
    # user_id { association(:user) }
  end
end
