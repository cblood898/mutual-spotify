const playlists = ( state = [], action ) => {
  switch (action.type) {
    case 'PLAYLISTS':
      return action.playlists
    case 'ADD_PLAYLIST':
      return [ action.playlist, ...state ]
    case 'UPDATE_PLAYLIST':
      return state.map( playlist => {
        if (playlist._id === action.playlist._id)
          return action.playlist;
        return playlist;
      })
    case 'DELETE_PLAYLIST':
      return state.filter( playlist => playlist._id !== action.id )
    default:
      return state;
  }
}

export default playlists;
