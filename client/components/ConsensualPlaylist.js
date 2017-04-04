import React from 'react';
import { connect } from 'react-redux';
import SpotifyPlaylists from './SpotifyPlaylists';
import SignUp from './SignUp';
import CPPlaylists from './CPPlaylists';
import CPMergedPlaylist from './CPMergedPlaylist';
import {postTracksToSpotify} from '../actions/spotify';

class ConsensualPlaylist extends React.Component {
  render() {
    const { title = '', description = '', playlists = '', _id = '', spotifyData = {} } = this.props.cplist || {};
    const { url = ''} = spotifyData;
    const { user = {} } = this.props;
    const isAdmin = user.role === 'admin';
    return (
      <div className="flexChild columnParent">
        <div className="flexChild shrink rowParent">
          <h4 className="flexChild">
            {/* {isAdmin && <span>Admin - </span>}{title} */}
            {title}
          </h4>
          <div className="flexChild shrink columnParent flexCenter">
            <a href={url} className="btn" target="_blank">Launch Playlist</a>
          </div>
        </div>
        <div className="flexChild shrink">
          <p>{description}</p>
        </div>
        {user._id ?
          <div className="rowParent flexChild">
            <div className="flexChild columnParent withListHeader">
              <div className="flexChild shrink listHeader">Playlists from Spotify</div>
              <SpotifyPlaylists cpId={_id} />
            </div>
            <div className="flexChild columnParent withListHeader collapsing">
              <div className="flexChild shrink listHeader">Playlists Added</div>
              <CPPlaylists cplist={this.props.cplist} />
            </div>
            <div className="flexChild columnParent withListHeader">
              <div className="flexChild shrink listHeader">Merged Playlist</div>
              <div className="flexChild shrink padded">
                <form
                  onSubmit={ e => {
                    e.preventDefault();
                    this.props.dispatch(postTracksToSpotify( user, this.props.cplist, sendTracks() ));
                  }}
                >
                  <button className="btn expand" type="submit">Add Tracks to Spotify</button>
                </form>
              </div>
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
