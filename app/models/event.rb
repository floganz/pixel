class Event < ApplicationRecord
  has_many :target

  def self.is_unique?(ip, date, target)
    @events = Event.where(:ip => ip)
                   .where(:date => date)
                   .where(:target_id => target)
                   .where(:unique => true)
    if @events.size == 0
      return true
    else
      return false
    end
  end
end
