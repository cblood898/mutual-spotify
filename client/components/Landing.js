import React from 'react';
import CPForm from './CPForm';
import CPList from './CPList';

class Landing extends React.Component {
  render() {
    return (
      <div>
        <CPForm />
        <CPList />
      </div>
    );
  }
};

export default Landing;
