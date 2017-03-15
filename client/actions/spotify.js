import { setFlash } from './flash';

export const getUserPlaylists = (user_id) => {
  // TODO: store access token somewhere
  const accessToken = 'BQBVAL4XbJXK92kdHcbrtZEJuuUYCgCgIwnYvItsiPMAksnrE5EwWPznSy2NrZdv1FLWeBC5nobfqrExrqbuPVXGXCowScTIiQ0PcoUZV2WmJ37p3q1qiJAkqL5HiShYEEXKepuValWNAr-WsrMz0uggbWKp7w';
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
