import { take, prop } from "ramda";

export default apiService;

function apiService(clientId, secret) {
  const TWITCH_BASE_URL = "https://api.twitch.tv/helix";
  const TWITCH_USERS_URL = `${TWITCH_BASE_URL}/users`;
  const TWITCH_CLIPS_URL = `${TWITCH_BASE_URL}/clips`;
  const MAX_NUMBER_OF_CLIPS = 3;

  const fetchOptions = {
    method: "GET",
    headers: new Headers({
      Accept: "application/json",
      "Client-ID": clientId
    })
  };

  function createURL(urlString) {
    return queryString => {
      const url = new URL(urlString);
      url.search = new URLSearchParams({
        ...queryString
      });
      return url;
    };
  }

  function getAuthorizationToken() {
    const url = createURL("https://id.twitch.tv/oauth2/token")({
      grant_type: "client_credentials",
      client_id: clientId,
      client_secret: secret,
    });
    return fetch(url, { method: "POST" }).then(parseResponseToJson);
  }

  function getTwitchUser(user) {
    const url = createURL(TWITCH_USERS_URL)({
      login: user
    });
    return fetch(url, fetchOptions)
      .then(parseResponseToJson)
      .then(extracDataFromResponse);
  }

  function getTwitchClipsByBroadcasterId(broadcasterId) {
    const url = createURL(TWITCH_CLIPS_URL)({
      broadcaster_id: broadcasterId,
      first: MAX_NUMBER_OF_CLIPS
    });
    return fetch(url, fetchOptions)
      .then(parseResponseToJson)
      .then(extracDataFromResponse);
  }

  function parseResponseToJson(response) {
    return response.json();
  }

  function extracDataFromResponse(parsedUsersResponse) {
    return prop("data", parsedUsersResponse);
  }

  return {
    getAuthorizationToken,
    getTwitchUser,
    getTwitchClipsByBroadcasterId
  };
}
