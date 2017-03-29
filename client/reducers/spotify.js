const spotify = ( state = {}, action ) => {
  switch (action.type) {
    case 'PLAYLISTS':
      return { playlists: action.playlists, ...state }
    case 'TRACKS':
      return { tracks: action.tracks, ...state }
    case 'UPDATE_TRACKS_SENT_TO_SPOTIFY':
      return { urisOnSpotify: action.urisOnSpotify }
    default:
      return state;
  }
}

export default spotify;
