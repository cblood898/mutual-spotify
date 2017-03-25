import { setFlash } from './flash';

export const getUserPlaylists = (user_id, access_token) => {
  return (dispatch) => {
    $.ajax({
      url: `https://api.spotify.com/v1/users/${user_id}/playlists`,
      type: 'GET',
      headers: {
        'Authorization': 'Bearer ' + access_token
      }
    }).done( playlists => {
      dispatch({ type: 'PLAYLISTS', playlists })
    });
  }
}

export const getPlaylistTracks = (user_id, playlist_id, playlist_name, access_token, cpId) => {
  return (dispatch) => {
    $.ajax({
      url: `https://api.spotify.com/v1/users/${user_id}/playlists/${playlist_id}/tracks`,
      type: 'GET',
      headers: {
        'Authorization': 'Bearer ' + access_token
      }
    }).done( spotifyTracks => {
      const tracks = spotifyTracks.items.map(item => {
        return {
          id: item.track.id,
          name: item.track.name,
          artist: item.track.artist,
          uri: item.track.uri,
        }
      });
      const jsonTracks = JSON.stringify(tracks);
      const data = {
        user_id,
        playlist_id,
        playlist_name,
        tracks: jsonTracks
      }
      $.ajax({
        url: `/api/cplists/${cpId}/add_tracks`,
        type: 'POST',
        data: data,
      })
      dispatch({ type: 'TRACKS', tracks })
    });
  }
}
