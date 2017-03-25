import React from 'react';
import { connect } from 'react-redux';

class List extends React.Component{
  render() {
    const { playlists = [] } = this.props.cplist;
    const tracks = playlists.map( playlist => {
      const ptracks = playlist.tracks.map(track => {
        return (<div className="collection-item">{track.name}</div>)
      })
      return (
        <div className="collection with-header">
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

export default connect()(List);
