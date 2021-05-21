import React from 'react';
import Card from 'react-bootstrap/Card';

class RenderMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test: '',
    };
  }

  render() {
    return (
      <Card style={{ width: '25rem', margin: '0 auto' }}>
        <Card.Img src={this.props.mapURL.data} alt="Map image of location" />
        <Card.Title>{this.props.location.display_name}</Card.Title>
        <Card.Text>Latitude: {this.props.location.lat}</Card.Text>
        <Card.Text>Longitude: {this.props.location.lon}</Card.Text>
      </Card>
    );
  }
}

export default RenderMap;
