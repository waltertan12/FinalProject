(function (root) {
  if (typeof root.LikeConstants === "undefined") {
    root.LikeConstants = {}
  }

  root.LikeConstants = {
    USER_LIKES_RECEIVED: "USER_LIKES_RECEIVED",
    USER_LIKE_RECEIVED: "USER_LIKE_RECEIVED",
    LIKE_CREATED: "LIKE_CREATED",
    LIKE_DESTROYED: "LIKE_DESTROYED"
  };

})(this);