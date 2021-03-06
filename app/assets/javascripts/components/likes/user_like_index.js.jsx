(function (root) {
  if (typeof root.UserLikeIndex === "undefined") {
    root.UserLikeIndex = {};
  }

  var Link = ReactRouter.Link;

  root.UserLikeIndex = React.createClass({
    getInitialState: function () {
      return {likes: []};
    },
    componentDidMount: function () {
      var userId = this.props.userId;
      UserLikeStore.addChangeListener(this.setLikes);
      if (UserLikeStore.hasUserLikes(userId)) {
        this.setLikes(userId);
      } else {
        this.getLikes(this.props);
      }
    },
    componentWillUnmount: function () {
      UserLikeStore.removeChangeListener(this.setLikes);
    },
    componentWillReceiveProps: function (nextProps) {
      if (UserLikeStore.hasUserLikes(nextProps.userId)) {
        this.setLikes(nextProps.userId);
      } else {
        this.getLikes(nextProps);
      }
    },
    getLikes: function (props) {
      var userId = props.userId;
      LikeActions.receiveUserLikes(userId);
    },
    setLikes: function (optionalUserId) {
      var userId = this.props.userId
      if (typeof optionalUserId === "undefined") {
        this.setState({likes: UserLikeStore.findLikes(userId)});
      } else {
        this.setState({likes: UserLikeStore.findLikes(optionalUserId)});
      }
    },
    render: function () {
      var likeList
          userId = this.props.userId;
      if (typeof this.state.likes === "undefined" ||
          this.state.likes.length === 0 ) {
          likeList = (
            <ul>
              <li>No likes...</li>
            </ul>
          );
      } else {
        likeList = (
          <ul>
            {
              this.state.likes.map( function (like, index) {
                if (index < 5) {
                  return <UserLikeIndexItem key={like.id} like={like}/>;
                }
              })
            }
          </ul>
        );

      }
      return (
        <div className="like-index">
          <Link to={"/users/" + userId + "/likes"}><h3>Likes</h3></Link>
          {likeList}
        </div>
      );
    }
  });
})(this);