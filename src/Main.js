/* eslint-disable */
import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';

const API_KEY = process.env.REACT_APP_API_KEY

class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      location: {},
      search: '',
      toggle: false,
    }
  }

  searchLocation = () => {
    axios.get(`https://us1.locationiq.com/v1/search.php?key=${API_KEY}&q=${this.state.search}&format=json`)
      .then(data => {
        this.setState({ location: data });
        this.setState({ data: this.state.location.data[0] });
        this.setState({ toggle: true });
      })
      .catch(error => {
        console.error(error);
      });
  }

  changeSearch = (e) => {
    this.setState({ search: e.target.value })
  }

  render() {
    return (
      <div id="Main" >
        <Form>
          <Form.Label>Enter Location</Form.Label>
          <Form.Control onChange={this.changeSearch} type="text" placeholder="Seattle" />
          <Button variant="success" onClick={this.searchLocation}>Explore!</Button>
        </Form>
        {this.state.toggle ?
          <Card variant="success" style={{ width: '18rem' }}>
            <Card.Title>{this.state.data.display_name}</Card.Title>
            <Card.Text>Latitude: {this.state.data.lat}</Card.Text>
            <Card.Text>Longitude: {this.state.data.lon}</Card.Text>
          </Card>
          : ''}
      </div >
    );
  }
}

export default Main;
