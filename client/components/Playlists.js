import React from 'react';
import { connect } from 'react-redux';
import Playlist from './Playlist';
import { getUserPlaylists } from '../actions/spotify';

class Playlists extends React.Component {
  render() {
    const user = this.props.user || {};
    if (user._id && !this.props.spotify.items) {
      console.log(user.spotify_auth.username);
      const spotify_auth = user.spotify_auth || {};
      const access_token = spotify_auth.access_token || '';
      this.props.dispatch(getUserPlaylists(user.spotify_auth.username, access_token, this.dispatch));
    }

    let username;
    let form;

    const playlistItems = this.props.spotify.items || [];
    const playlists = playlistItems.map(playlist => {
      let { id, name } = playlist;
      return (<li key={id} className="collection-item">{name}</li>)
    });

    return (
      <div>
        <a className="btn" href="/spotify/login">Link Spotify</a>
        {/* <form
          ref={ n => form = n }
          onSubmit={ e => {
            e.preventDefault();
            this.props.dispatch(getUserPlaylists(username.value, access_token));
            form.reset();
          }}
        >
          <input type="text" ref={ n => username = n } />
          <button className="btn">Get Playlists</button>
        </form> */}
        <div className="cols s12 m6">
          <ul className="collection">
            { playlists }
          </ul>
        </div>
      </div>
    );
  };
};

const mapStateToProps = (state) => {
 return { spotify: state.spotify, user: state.user }
}

export default connect(mapStateToProps)(Playlists);
