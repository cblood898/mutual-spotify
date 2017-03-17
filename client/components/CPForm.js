import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { addPlaylist } from '../actions/playlists';

class CPForm extends React.Component {
  render() {
    let { dispatch } = this.props;
    let name;
    let description;
    let form;
    return (
      <div>
        <form
          ref={ n => form = n }
          onSubmit={ e => {
            e.preventDefault();
            dispatch(addPlaylist(name.value, description.value));
            form.reset();
          }}
        >
          <input name="name" type="text" ref={ n => name = n } placeholder="Jamify Playlist Name" />
          <input name="description" type="text" ref={ n => description = n } placeholder="Jamify Playlist Description" />
          <button className="btn" type="submit">Add Jamify Playlist</button>
        </form>
      </div>
    );
  }
};

export default connect()(CPForm);
