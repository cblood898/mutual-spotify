import React from 'react';
import { deleteCPPlaylist } from '../actions/spotify';
import { connect } from 'react-redux';

class CPPlaylist extends React.Component {
  state = { collapsed: true };

  toggleCollapse = () => {
    console.log("clicked");
    this.setState((state) => {
      const { collapsed } = state;
      const nextState = !collapsed;
      return { collapsed: nextState };
    })
  };

  render() {
    const { playlist } = this.props;
    const ptracks = playlist.tracks.map((track, i) => {
      return (
        <div key={i} className="collection-item avatar">
          <img src={track.image} alt="" className="circle"/>
          <span className="title">{track.name}</span>
          <p className="metadata">{track.artists}</p>
          <audio controls src={track.previewUrl}></audio>
        </div>
      )
    })
    return (
      <div className="collection">
        <div className="collection-item">
          {playlist.username} - {playlist.playlist_name}
          <span onClick={this.toggleCollapse} className="secondary-content pointy">
            <i className="material-icons">
              list
            </i>
          </span>
          <span onClick={() => {
            this.props.dispatch(deleteCPPlaylist(this.props.cplistId, playlist))
          }}
           className="secondary-content pointy">
              <i className="material-icons">
                delete
              </i>
          </span>
        </div>
        {!this.state.collapsed && ptracks}
      </div>
    )
  }
};

export default connect()(CPPlaylist);
