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

export const addCPlist = (title, description) => {
  return (dispatch) => {
    $.ajax({
      url: `/api/cplists`,
      type: 'POST',
      data: { title, description }
    }).done( cplist => {
      dispatch({ type: 'ADD_CPLIST', cplist })
    });
  }
}
