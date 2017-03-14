import { setFlash } from './flash';

export const getUserPlaylists = (user_id) => {
  // TODO: store access token somewhere
  const accessToken = 'BQAO_tqwC5Bd0OiSUseb4LCKl-VPczyqAsFkHHYtzN4klMAkyHzVNOy9LlXHa1hDkA1SitetpTvwJIZzg85Fdgwbmt0GuQab2uPXXIOypXMx4RtDvgJH9-gzKWLgWtyTQauKASyh3zNhb2aI2dR8yesKMxjxsg';
  return (dispatch) => {
    $.ajax({
      url: `https://api.spotify.com/v1/users/${user_id}/playlists`,
      type: 'GET',
      headers: {
        'Authorization': 'Bearer ' + accessToken
      }
    }).done( playlists => {
      // console.warn(playlists);
      dispatch({ type: 'PLAYLISTS', user_id, playlists: playlists })
    });
  }
}
