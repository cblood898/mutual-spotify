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
      <div className="flexChild columnParent">
        <div className="flexChild shrink rowParent">
          <h3 className="flexChild">
            {isAdmin && <span>Admin - </span>}{title}
          </h3>
          <div className="flexChild shrink columnParent flexCenter">
            <a href={url} className="btn" target="_blank">Launch Playlist</a>
          </div>
        </div>
        <div className="flexChild shrink">
          <p>{description}</p>
        </div>
        {user._id ?
          <div className="rowParent flexChild">
            <div className="flexChild columnParent">
              <h5 className="flexChild shrink padded">Playlists from Spotify</h5>
              <SpotifyPlaylists cpId={_id} />
            </div>
            <div className="flexChild columnParent">
              <h5 className="flexChild shrink padded">Playlists Added</h5>
              <CPPlaylists cplist={this.props.cplist} />
            </div>
            <div className="flexChild columnParent">
              <h5 className="flexChild shrink padded">Merged Playlist</h5>
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
