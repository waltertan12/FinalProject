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
  has_many :taggings, as: :taggable, dependent: :destroy
  has_many :tags, through: :taggings
  has_many :playlistings
  has_many :playlists, 
    through: :playlistings,
    source: :playlist
  has_many :feeds, as: :source, dependent: :destroy

  after_save do |track|
    feed = Feed.find_by(source_id: track.id, source_type: "Track")
    if feed
      rank = track.user.followers.count + track.likes.count
      feed.update(updated_at: track.updated_at, rank: rank)
    else
      rank = track.user.followers.count

      Feed.create(
        user_id: track.user_id, 
        source_id: track.id, 
        source_type: "Track",
        rank: rank
      )
    end
  end

  def ensure_image_url
    self.image_url ||= User.find(self.user_id).image_url if self.new_record?
  end
end
