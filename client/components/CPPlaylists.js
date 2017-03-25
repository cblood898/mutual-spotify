import React from 'react';
import { connect } from 'react-redux';

class CPPlaylists extends React.Component{
  render() {
    const { playlists = [] } = this.props.cplist;
    const tracks = playlists.map( (playlist, index) => {
      const ptracks = playlist.tracks.map((track, i) => {
        return (<div key={i} className="collection-item">{track.name}</div>)
      })
      return (
        <div key={index} className="collection with-header">
          <div className="collection-header">
            {playlist.username} - {playlist.playlist_name}
          </div>
          {ptracks}
        </div>
      )
    });

    return (
      <div>
        {tracks}
      </div>
    )
  }
}

export default connect()(CPPlaylists);