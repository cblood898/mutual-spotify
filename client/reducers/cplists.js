const cplists = ( state = [], action ) => {
  switch (action.type) {
    case 'CPLISTS':
      return action.cplists
    case 'ADD_CPLIST':
      return [ action.cplist, ...state ]
    case 'UPDATE_CPLIST':
      return state.map( cplist => {
        if (cplist._id === action.cplist._id)
          return action.cplist;
        return cplist;
      })
    case 'DELETE_CPLIST':
      return state.filter( cplist => cplist._id !== action.id )
    default:
      return state;
  }
}

export default cplists;
