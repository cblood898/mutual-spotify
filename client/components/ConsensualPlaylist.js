import React from 'react';
import { connect } from 'react-redux';


class ConsensualPlaylist extends React.Component {
  render() {
    let { title = '', description = '', playlists = '' } = this.props.cplist || {};

    return (
      <div>
        <h3>{title}</h3>
        <p>Description:  {description}</p>
      </div>
    );
  }
};
const mapStateToProps = (state, props) => {
  return {
    cplist: state.cplists.find( p => p._id === props.params.id)
  }
}

export default connect(mapStateToProps)(ConsensualPlaylist);
