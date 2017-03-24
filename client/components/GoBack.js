import React from 'react';

class GoBack extends React.Component {
  componentDidMount() {
    window.location.back()
  }

  render() {
    return (
      <div>hi</div>
    );
  }
};

export default GoBack;
