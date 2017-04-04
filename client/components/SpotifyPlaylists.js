import React from 'react';
import { connect } from 'react-redux';
import { getUserPlaylists, getPlaylistTracks } from '../actions/spotify';

class SpotifyPlaylists extends React.Component {
  render() {
    const spotifyPlaylists = this.props.spotify.playlists || [];
    const user = this.props.user || {};
    const spotify_auth = user.spotify_auth || {};
    const access_token = spotify_auth.access_token || '';
    if (spotify_auth.access_token && !spotifyPlaylists.items) {
      this.props.dispatch(getUserPlaylists(user.spotify_auth.username, access_token));
    }

    const playlistItems = spotifyPlaylists.items || [];
    const playlists = playlistItems
    .filter(item => {
      return item.owner.id === user.spotify_auth.username
    })
    .filter(item => {
      return item.name.indexOf("(Jamify)") === -1
    })
    .map(playlist => {
      let { id, name } = playlist;
      return (
        <a key={id} className="collection-item">
          {name}
          <span className="secondary-content">
            <i
              className="material-icons pointy"
              onClick={() => this.props.dispatch(getPlaylistTracks(user.spotify_auth.username, id, name, access_token, this.props.cpId))}
            >library_add</i>
          </span>
        </a>
      )
    });

    return (
      <div className="flexChild scroll padded">
        {playlistItems.length > 0 ?
          <div className="cols s12 m6">
            <div className="collection">
              { playlists }
            </div>
          </div>
        :
          <div>
            <a className="btn expand" href="/spotify/login">Get Spotify Playlists</a>
            <h6 className="center">No playlists</h6>
          </div>
        }
      </div>
    );
  };
};

const mapStateToProps = (state) => {
 return { spotify: state.spotify, user: state.user }
}

export default connect(mapStateToProps)(SpotifyPlaylists);
