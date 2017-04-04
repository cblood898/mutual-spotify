import React from 'react';
import { connect } from 'react-redux';
import { getCPlists } from '../actions/cplists';

class SetupStuff extends React.Component {
  componentDidMount() {
    this.props.dispatch(getCPlists());
  }
  render() {
    return (
      <div className="flexChild columnParent">
        {this.props.children}
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return { cplists: state.cplists }
}

export default connect(mapStateToProps)(SetupStuff);
