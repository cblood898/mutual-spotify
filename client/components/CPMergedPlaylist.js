import React from 'react';
import { connect } from 'react-redux';
import {postTracksToSpotify} from '../actions/spotify';

class CPMergedPlaylist extends React.Component{
  render() {
    const user = this.props.user || {};
    const {
      playlists = [],
      spotifyData = {},
      tracksInSpotifyPlaylist = []
    } = this.props.cplist;
    const spotifyPlaylistId = spotifyData.id || '';

    const tracks = () => {
      if (playlists.length > 1) {
        const mtracks = playlists[0].tracks.filter((n) => {
          return playlists[1].tracks.map(x => {return x.name; }).indexOf(n.name) > -1;
        }).map((track, i) => {
          const active = tracksInSpotifyPlaylist.indexOf(track.uri) > -1;
          const classes = `collection-item avatar ${active ? 'active' : ''}`;
          return (
            <div key={i} className={classes}>
              <img src={track.image} alt="" className="circle"/>
              <span className="title">{track.name}</span>
              <p className="metadata">{track.artists}</p>
              <audio controls src={track.previewUrl}></audio>
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
      <div className="flexChild scroll padded">
        <form
          onSubmit={ e => {
            e.preventDefault();
            this.props.dispatch(postTracksToSpotify( user, this.props.cplist, sendTracks() ));
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
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(CPMergedPlaylist);
