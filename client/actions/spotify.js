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
          artists: item.track.artists[0].name,
          image: item.track.album.images[2].url,
          previewUrl: item.track.preview_url,
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
export const postTracksToSpotify = ( user, cplist, uris ) => {
  return (dispatch) => {
    const playlist_id = cplist.spotifyData.id;
    const body = JSON.stringify({uris: uris});
    $.ajax({
      url: `https://api.spotify.com/v1/users/${user.spotify_auth.username}/playlists/${playlist_id}/tracks`,
      type: 'PUT',
      headers: {
        'Authorization': 'Bearer ' + user.spotify_auth.access_token,
        'Content-Type': 'application/json',
      },
      data: body,
    }).done( playlist => {
      const databaseData = { uris: JSON.stringify(uris) };
      // TODO: Add to database and state
      $.ajax({
        url: `/api/cplists/${cplist._id}/add_uris`,
        type: 'PUT',
        data: databaseData
      }).done( playlist => {
        const urisOnSpotify = playlist.tracksInSpotifyPlaylist;
        dispatch({ type: 'UPDATE_TRACKS_SENT_TO_SPOTIFY', urisOnSpotify })
      })
    });
  }
}
