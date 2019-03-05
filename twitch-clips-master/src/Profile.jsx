import React, { Component } from "react";
import { Icon } from "react-materialize";
import "./App.css";

const Profile = ({ broadcaster }) => {
    const numberFormat = Intl.NumberFormat()

  return (
    broadcaster && broadcaster.login ?
    <div className="profile">
      <img
        className="profile-img"
        src={broadcaster.profileImageUrl}
        alt="profile-img"
      />
      <div className="profile-info">
        <div className="profile-name">
          <Icon small>perm_identity</Icon>
          {broadcaster.displayName}
        </div>
        <div className="profile-url">
          <Icon small>slideshow</Icon>
          {`www.twitch.tv/${broadcaster.login}`}
        </div>
        <div className="profile-followers">
          <Icon small>remove_red_eye</Icon>
          {numberFormat.format(broadcaster.viewCount)} views
        </div>
      </div>
    </div>
    : null 
  );
};
export default Profile;
