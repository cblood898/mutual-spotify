import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { deleteCPlist } from '../actions/cplists';

class CPList extends React.Component {
  render() {
    const cplists = this.props.cplists || [];
    const cplistList = cplists.map( cplist => {
      return (
        <li
          key={cplist._id}
          className="collection-item"
        >
          <Link to={`/playlists/${cplist._id}`}>{cplist.title}</Link>
          <a
            onClick={() => {
              this.props.dispatch(deleteCPlist(cplist._id))
            }}
            className="secondary-content pointy"
          ><i className="material-icons">delete</i></a>
        </li>
      )
    })
    return (
      <div>
        <ul className="collection">
          { cplists.length ? cplistList : <li>No Playlists</li>}
        </ul>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
 return { cplists: state.cplists }
}

export default connect(mapStateToProps)(CPList);
