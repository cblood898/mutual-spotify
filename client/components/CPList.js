import React from 'react';
import { connect } from 'react-redux';

class CPList extends React.Component {
  render() {
    console.warn(this.props.cplists);
    const cplists = this.props.cplists || [];
    const cplistList = cplists.map( cplist => {
      return (<li key={cplist._id}>{cplist.title}</li>)
    })
    return (
      <div>
        <ul>
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
