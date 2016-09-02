class Event < ApplicationRecord
  has_many :target

  def self.is_unique?(ip, date)
    @events = Event.where(:ip => ip)
                   .where(:date => date)
  end
end
