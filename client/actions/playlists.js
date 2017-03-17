export const addPlaylist = () => {
  return (dispatch) => {
    $.ajax({
      url: `/api/playlists`,
      type: 'POST',
    }).done( playlist => {
      dispatch({ type: 'PLAYLISTS', playlist })
    });
  }
}
