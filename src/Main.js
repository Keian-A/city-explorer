import React from 'react';

const API_KEY = process.env.REACT_APP_API_KEY

class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      location: {},
    }
  }

  render() {
    return (
      <div id="Main" >
        {/* Main */}
      </div>
    );
  }
}

export default Main;
