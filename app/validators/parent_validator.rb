class ParentValidator < ActiveModel::Validator
  def validate(record)
    if record.path.nil?
      return true
    end
    unless record.path_changed?
      return true
    end
    ids = record.path.to_s.split('.')
    if ids.length > 1
      path = Target.where("path LIKE '%#{record.path.try(:[],/\d+$/)}.%'")
    else
      path = Target.where("path LIKE '%#{record.path.try(:[],/\d+/)}.%'")
    end
    if path.length > 0
      record.errors[:base] << "Parent already have children"
      return false
    end
    return true
  end
end