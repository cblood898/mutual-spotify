import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { addCPlist } from '../actions/cplists';

class CPForm extends React.Component {
  render() {
    let { dispatch, user } = this.props;
    let title;
    let description;
    let form;
    return (
      <div>
        <a className="btn" href="/spotify/login">Sign in to Spotify</a>
        <form
          ref={ n => form = n }
          onSubmit={ e => {
            e.preventDefault();
            dispatch(addCPlist(user, title.value, description.value));
            form.reset();
          }}
        >
          <input name="title" type="text" ref={ n => title = n } placeholder="Jamify Playlist Title" autoFocus='focus'/>
          <input name="description" type="text" ref={ n => description = n } placeholder="Jamify Playlist Description" />
          <button className="btn" type="submit">Add Jamify Playlist</button>
        </form>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return { user: state.user }
}

export default connect(mapStateToProps)(CPForm);
