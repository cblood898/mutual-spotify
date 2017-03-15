import React from 'react';
import { connect } from 'react-redux';
import Playlist from './Playlist';
import { getUserPlaylists } from '../actions/spotify';

class Playlists extends React.Component {
  render() {
    let username;
    let form;

    const playlistItems = this.props.spotify.items || [];
    const playlists = playlistItems.map(playlist => {
      let { id, name } = playlist;
      return (<li key={id} className="collection-item">{name}</li>)
    });
    const spotify_auth = this.props.spotify_auth || {};
    const access_token = spotify_auth.access_token || '';
    return (
      <div>
        <a className="btn" href="/spotify/login">Link Spotify</a>
        <form
          ref={ n => form = n }
          onSubmit={ e => {
            e.preventDefault();
            this.props.dispatch(getUserPlaylists(username.value, access_token));
            form.reset();
          }}
        >
          <input type="text" ref={ n => username = n } />
          <button className="btn">Get Playlists</button>
        </form>
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
 return { spotify: state.spotify, spotify_auth: state.user.spotify_auth }
}

export default connect(mapStateToProps)(Playlists);
