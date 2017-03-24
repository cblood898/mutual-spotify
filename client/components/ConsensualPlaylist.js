import React from 'react';
import { connect } from 'react-redux';
import SpotifyPlaylists from './SpotifyPlaylists';


class ConsensualPlaylist extends React.Component {
  render() {
    let { title = '', description = '', playlists = '' } = this.props.cplist || {};

    return (
      <div className="container">
        <h3>{title}</h3>
        <p>{description}</p>
        <div className="row">
          <div className="col s12 m6">
            <SpotifyPlaylists />
          </div>
          <div className="col s12 m6">
            list
          </div>
        </div>
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
