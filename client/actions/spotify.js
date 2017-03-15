import { setFlash } from './flash';

export const getUserPlaylists = (user_id, access_token) => {
  // TODO: store access token somewhere
  return (dispatch) => {
    $.ajax({
      url: `https://api.spotify.com/v1/users/${user_id}/playlists`,
      type: 'GET',
      headers: {
        'Authorization': 'Bearer ' + access_token
      }
    }).done( playlists => {
      // console.warn(playlists);
      dispatch({ type: 'PLAYLISTS', user_id, playlists: playlists })
    });
  }
}
