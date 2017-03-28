import React from 'react';
import { connect } from 'react-redux';
import {postTracksToSpotify} from '../actions/spotify';

class CPMergedPlaylist extends React.Component{
  render() {
    const user = this.props.user || {};
    const { playlists = [], spotifyData = {} } = this.props.cplist;
    const spotifyPlaylistId = spotifyData.id || '';

    const tracks = () => {
      if (playlists.length > 1) {
        const mtracks = playlists[0].tracks.filter((n) => {
          return playlists[1].tracks.map(x => {return x.name; }).indexOf(n.name) > -1;
        }).map((track, i) => {
          return (
            <div key={i} className="collection-item">
              <span className="title">{track.name}</span>
              <p>{track.id}</p>
            </div>
          )
        });
        return mtracks;
      }
    }

    const sendTracks = () => {
      if (playlists.length > 1) {
        const mtracks = playlists[0].tracks.filter((n) => {
          return playlists[1].tracks.map(x => {return x.name; }).indexOf(n.name) > -1;
        })
        .map( track  => {
          return track.uri;
        });

        return mtracks;
      }
      return [];
    }

    return (
      <div>
        <form
          onSubmit={ e => {
            e.preventDefault();

            this.props.dispatch(postTracksToSpotify( user, spotifyPlaylistId, sendTracks() ));
          }}
        >
          <button className="btn" type="submit">Add Tracks to Spotify</button>
        </form>
        <div className="collection">{tracks()}</div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { user: state.user }
}

export default connect(mapStateToProps)(CPMergedPlaylist);
