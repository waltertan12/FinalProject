class Api::FollowingsController < ApplicationController
  def create
    @following = current_user.follow(params[:followed_id])
    @user = current_user
    render :create
  end

  def destroy
    @unfollowing = current_user.unfollow(params[:followed_id])
    @user = current_user
    render :destroy
  end
end
