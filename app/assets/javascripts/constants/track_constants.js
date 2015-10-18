(function (root) {
  if (typeof root.TrackConstants === "undefined") {
    root.TrackConstants = {}
  }

  root.TrackConstants = {
    TRACKS_RECEIVED: "TRACKS_RECEIVED",
    TRACK_RECEIVED: "TRACK_RECEIVED",
    TRACK_CREATED: "TRACK_CREATED",
    TRACK_PROGRESS: "TRACK_PROGRESS",
    RESET_PLAYLIST: "RESET_PLAYLIST",
    PLAY_TRACK: "PLAY_TRACK",
    PAUSE_TRACK: "PAUSE_TRACK",
    NEXT_TRACK: "NEXT_TRACK",
    PREVIOUS_TRACK: "PREVIOUS_TRACK"
  };

})(this);