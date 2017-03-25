import React from 'react';
import { connect } from 'react-redux';

class CPMergedPlaylist extends React.Component{
  render() {
    const { playlists = [] } = this.props.cplist;

    const tracks = () => {
      if (playlists.length > 1) {
        const mtracks = playlists[0].tracks.filter((n) => {
          console.log(n.name)
          console.log(playlists[1].tracks.map(function(x) {return x.id; }).indexOf(n.id));
          return playlists[1].tracks.map(function(x) {return x.id; }).indexOf(n.id) > -1;
        });

        const atracks = mtracks.map((track, i) => {
          return (
            <div key={i} className="collection-item">
              <span className="title">{track.name}</span>
              <p>{track.id}</p>
            </div>
          )
        });
        console.warn(atracks);
        return atracks;
      }
    }

    // const tracks = playlists.map( (playlist, index) => {
    //   let mtracks = [];
    //   if (index > 0) {
    //     mtracks = playlist.tracks.filter(t => {
    //       return playlists[index - 1].tracks.indexOf(t) != -1;
    //     })
    //   }
      // const ptracks = playlist.tracks.map(track => {
      //   return {track}
      // })
      // return (
      //   <div className="collection with-header">
      //     <div className="collection-header">
      //       {playlist.username} - {playlist.playlist_name}
      //     </div>
      //     {mtracks}
      //   </div>
      // )
    // });

    return (
      <div>
        {tracks()}
      </div>
    )
  }
}

export default connect()(CPMergedPlaylist);
