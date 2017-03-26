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
    const body = JSON.stringify({'name': `${title} (Jamify)`});
    $.ajax({
      url: `https://api.spotify.com/v1/users/${user.spotify_auth.username}/playlists`,
      type: 'POST',
      headers: {
        'Authorization': 'Bearer ' + user.spotify_auth.access_token
      },
      data: body,
    }).done( playlist => {
      const spotifyData = JSON.stringify({
        id: playlist.id,
        url: playlist.external_urls.spotify,
        uri: playlist.uri,
      })
      $.ajax({
        url: `/api/cplists`,
        type: 'POST',
        data: { title, description, spotifyData }
      }).done( cplist => {
        dispatch({ type: 'ADD_CPLIST', cplist })
      })
    });
  }
}
