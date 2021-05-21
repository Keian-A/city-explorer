import React from 'react';
import Card from 'react-bootstrap/Card';

class RenderWeather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test: '',
    };
  }

  render() {
    return (
      <Card style={{ width: '25rem', margin: '0 auto' }}>
        <Card.Title>On {this.props.displayDate}</Card.Title>
        <Card.Text>The live temp: {this.props.displayappTemp} degrees celcius with {this.props.displayCloudLevel}.</Card.Text>
      </Card>
    );
  }
}

export default RenderWeather;
