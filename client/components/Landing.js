import React from 'react';
import { connect } from 'react-redux';
import CPForm from './CPForm';
import CPList from './CPList';
import Marketing from './Marketing';

class Landing extends React.Component {
  render() {
    let { user } = this.props;
    const isAdmin = user._id;
    // const isAdmin = user.role === 'admin';
    return (
      <div className="container">
        {isAdmin ?
          <div>
            <CPForm />
            <CPList />
          </div>
        :
          <div>
            <Marketing />
          </div>
        }
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return { user: state.user }
}

export default connect(mapStateToProps)(Landing);
