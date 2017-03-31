import React from 'react';

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
        <div key={i} className="collection-item">
          <span className="title">{track.name}</span>
          <p className="metadata">{track.id}</p>
          <p className="metadata">{track.uri}</p>
        </div>
      )
    })
    return (
      <div className="collection">
        <div className="collection-item">
          {playlist.username} - {playlist.playlist_name}
          <a onClick={this.toggleCollapse} className="secondary-content pointy">
            <i className="material-icons">
              list
            </i>
          </a>
        </div>
        {!this.state.collapsed && ptracks}
      </div>
    )
  }
};

export default CPPlaylist;
