(function (root) {
  if (typeof root.PlaylistShow === "undefined") {
    root.PlaylistShow = {};
  }

  root.PlaylistShow = React.createClass({
    getInitialState: function () {
      return {playlist: PlaylistStore.findPlaylist(-1, -1)};
    },
    componentDidMount: function () {
      PlaylistStore.addChangeListener(this.setPlaylist);
      this.getPlaylist(this.props);
    },
    componentWillUnmount: function () {
      PlaylistStore.removeChangeListener(this.setPlaylist);
    },
    componentWillReceiveProps: function (nextProps) {
      this.getPlaylist(nextProps);
    },
    getPlaylist: function (props) {
      var userId = props.params.userId,
          playlistId = props.params.playlistId;
      PlaylistActions.receivePlaylist(playlistId);
    },
    setPlaylist: function () {
      var userId = parseInt(this.props.params.userId),
          playlistId = parseInt(this.props.params.playlistId),
          playlist = PlaylistStore.findPlaylist(userId, playlistId);
          
      this.setState({playlist: playlist});
    },
    render: function () {
      var playlist = this.state.playlist;
      if (playlist.id === -1) {
        spinner = <div className="loader"/>;
      } else {
        spinner = <div/>;
      }
      return (
        <div className="playlist-show row">
          <div className="jumbotron playlist-show-header">
            <h1>{playlist.title}</h1>
            {spinner}
            <LikeButton likableType="Playlist" 
                      likableId={playlist.id} />
            <PlaylistEditButton userId={playlist.user_id} 
                                playlistId={playlist.id}/>
          </div>
          <div className="playlist-show-container col-md-8">
            <div className="container-fullwidth track-description">
              <div className="container-fullwidth">
                <h3>Description</h3>
                <p>{playlist.description}</p>
                <h3>Tags</h3>
                <Tags tags={playlist.tags}/>
              </div>
            </div>
            <div className="track-index">
              <h2>Tracks</h2>
              <TrackIndex tracks={playlist.tracks} />
            </div>
          </div>
          <TrackSidebar type="Playlist" 
                        playlists={[]} 
                        likes={playlist.likes}/>
        </div>
      );
    }
  });
})(this);