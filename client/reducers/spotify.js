const spotify = ( state = {}, action ) => {
  switch (action.type) {
    case 'PLAYLISTS':
      return { playlists: action.playlists, ...state }
    case 'TRACKS':
      return { tracks: action.tracks, ...state }
    default:
      return state;
  }
}

export default spotify;
