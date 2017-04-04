import React from 'react';
import { connect } from 'react-redux';
import CPPlaylist from './CPPlaylist';

class CPPlaylists extends React.Component{

  render() {
    const { playlists = [] } = this.props.cplist;
    const cplists = playlists.map( (playlist, index) => {
      return (
        <CPPlaylist playlist={playlist} key={index} />
      )
    });

    return (
      <div className="flexChild scroll padded">
        {cplists}
      </div>
    )
  }
}

export default connect()(CPPlaylists);
