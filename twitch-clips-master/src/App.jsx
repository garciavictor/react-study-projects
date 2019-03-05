import React, { useState, useEffect } from "react";
import Form from "./Form.jsx";
import Profile from "./Profile.jsx";
import Gallery from "./Gallery.jsx";
import apiService from "./services/apiService";
import { isEmpty } from "ramda";
import "./App.css";

export default () => {
  const [broadcaster, setBroadcaster] = useState({});
  const [clips, setClips] = useState([]);
  const { getTwitchUser, getTwitchClipsByBroadcasterId } = apiService(
    process.env.REACT_APP_CLIENT_ID,
    process.env.REACT_APP_SECRET_KEY
  );

  const onSearch = async searchTerm => {
    const twitchUserResponse = await getTwitchUser(searchTerm);
    const user = twitchUserResponse.reduce((prev, curr) => curr, {});
    setBroadcaster({
      id: user.id,
      login: user.login,
      description: user.description,
      displayName: user.display_name,
      profileImageUrl: user.profile_image_url,
      viewCount: user.view_count
    });
    const twitchClipsResponse = await getTwitchClipsByBroadcasterId(user.id);
    setClips(twitchClipsResponse);
  };

  return (
    <div className="app">
      <span className="app-title">Twitch Clips Master</span>
      <Form
        searchStreamer={onSearch}
      />
      <Profile broadcaster={broadcaster} />
      <Gallery clips={clips} />
    </div>
  );
};
