(function (root) {
  if (typeof root.UserLikeStore === "undefined") {
    root.UserLikeStore = {};
  }

  var _userLikes = {},
      resetUserLikes = function (userId, likes) {
        _userLikes[userId] = likes;
      },
      addUserLike = function (userId, like) {
        if (typeof _userLikes[userId] === "undefined") {
          _userLikes[userId] = [like];
        } else {
          _userLikes[userId].push(like);
        }
      },
      removeUserLike = function (userId, like) {
        if (typeof _userLikes[userId] !== "undefined") {
          for (var i = 0; i < _userLikes[userId].length; i++) {
            if (_userLikes[userId][i].id === like.id) {
              return _userLikes[userId].splice(i, 1);
            }
          };
        }
      },
      findUserLikeIndex = function (like) {

      },
      CHANGE_EVENT = "CHANGE_EVENT";

  root.UserLikeStore = $.extend({}, EventEmitter.prototype,{
    all: function () {
      return _userLikes;
    },
    findLikes: function (userId) {
      if (typeof _userLikes[userId] === "undefined") {
        return [];
      } else {
        return _userLikes[userId];
      }
    },
    addChangeListener: function (callback) {
      this.on(CHANGE_EVENT, callback)
    },
    removeChangeListener: function (callback) {
      this.removeListener(CHANGE_EVENT, callback)
    },
    hasUserLikes: function (userId) {
      return typeof _userLikes[userId] !== "undefined"
    },
    dispatcherId: AppDispatcher.register(function (payload) {
      if (payload.actionType === LikeConstants.USER_LIKES_RECEIVED) {
        resetUserLikes(payload.userId, payload.likes);
        root.UserLikeStore.emit(CHANGE_EVENT);
      } else if (payload.actionType === LikeConstants.LIKE_CREATED) {
        addUserLike(payload.userId, payload.like);
        root.UserLikeStore.emit(CHANGE_EVENT);
      } else if (payload.actionType === LikeConstants.LIKE_DESTROYED) {
        removeUserLike(payload.userId, payload.like);
        root.UserLikeStore.emit(CHANGE_EVENT);
      }
    })
  });
})(this);