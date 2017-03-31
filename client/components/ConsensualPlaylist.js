import React from 'react';
import { connect } from 'react-redux';
import SpotifyPlaylists from './SpotifyPlaylists';
import SignUp from './SignUp';
import CPPlaylists from './CPPlaylists';
import CPMergedPlaylist from './CPMergedPlaylist';

class ConsensualPlaylist extends React.Component {
  render() {
    const { title = '', description = '', playlists = '', _id = '', spotifyData = {} } = this.props.cplist || {};
    const { url = ''} = spotifyData;
    const { user = {} } = this.props;
    const isAdmin = user.role === 'admin';
    return (
      <div>
        <h3>{isAdmin && <span>Admin - </span>}{title}</h3>
        <p>{description}</p>
        <a href={url} className="btn" target="_blank">Launch Playlist</a>
        {user._id ?
          <div className="row">
            <div className="col s12 m4">
              <SpotifyPlaylists cpId={_id} />
            </div>
            <div className="col s12 m4">
              <CPPlaylists cplist={this.props.cplist} />
            </div>
            <div className="col s12 m4">
              <CPMergedPlaylist cplist={this.props.cplist} />
            </div>
          </div>
        :
          <div>
            {/* <SignUp /> */}
            Please sign in.
          </div>
        }
      </div>
    );
  }
};
const mapStateToProps = (state, props) => {
  return {
    cplist: state.cplists.find( p => p._id === props.params.id),
    user: state.user,
  }
}

export default connect(mapStateToProps)(ConsensualPlaylist);
