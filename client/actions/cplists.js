export const getCPlists = () => {
  return (dispatch) => {
    $.ajax({
      url: '/api/cplists',
      type: 'GET'
    }).done( cplists => {
      dispatch( { type: 'CPLISTS', cplists })
    })
  }
}

export const addCPlist = (user, title, description) => {
  return (dispatch) => {
    $.ajax({
      url: `/api/cplists`,
      type: 'POST',
      data: { title, description }
    }).done( cplist => {
      const body = JSON.stringify({'name': title});
      $.ajax({
        url: `https://api.spotify.com/v1/users/${user.spotify_auth.username}/playlists`,
        type: 'POST',
        headers: {
          'Authorization': 'Bearer ' + user.spotify_auth.access_token
        },
        body: body,
      })
      .done( playlist => {
        $.ajax({
          url: `/api/cplists/${cplist._id}/add_spotify_data`,
          type: 'POST',
          data: playlist,
        })
      });
      dispatch({ type: 'ADD_CPLIST', cplist })
    });
  }
}
