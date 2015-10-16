class Track < ActiveRecord::Base
  validates :title, :user_id, :track_url, presence: true
  validates :private, inclusion: { in: [true, false] }
  validates :track_url, presence: true, allow_nil: true
  
  before_save :ensure_image_url

  belongs_to :user
  has_many :comments
  has_many :likes, 
    as: :likable, 
    class_name: "Liking",
    foreign_key: :likable_id,
    primary_key: :id,
    dependent: :destroy

  def ensure_image_url
    self.image_url ||= User.find(self.user_id).image_url if self.new_record?
  end
end
