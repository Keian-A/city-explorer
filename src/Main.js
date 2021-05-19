/* eslint-disable */
import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';
import DayCard from './DayCard.js';

const API_KEY = process.env.REACT_APP_API_KEY

class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      location: {},
      search: '',
      toggle: false,
      maps_url: '',
      dayArray: [],
    }
  }

  searchLocation = () => {
    axios.get(`https://us1.locationiq.com/v1/search.php?key=${API_KEY}&q=${this.state.search}&format=json`)
      .then(data => {
        this.setState({ location: data });
        this.setState({ data: this.state.location.data[0] });
        this.setState({ toggle: true });
        this.setState({ maps_url: `https://maps.locationiq.com/v3/staticmap?center=${this.state.data.lat},${this.state.data.lon}&zoom=12&size=500x500&key=${API_KEY}` })
      })
      .catch(error => {
        <Alert variant="danger">{error}</Alert>
      });
  }

  changeSearch = (e) => {
    this.setState({ search: e.target.value })
  }

  getWeather = () => {
    axios.get(`http://localhost:3030/weather?lat=${this.state.data.lat}&lon=${this.state.data.lon}&searchQuery=${this.state.search}`)
      .then(response => {
        this.setState({ dayArray: response.data })
      })
      .catch(error => {
        this.errorLog(error);
      });
  }

  errorLog = (error) => {
    console.error(error);
  }

  render() {
    return (
      <div id="Main" >
        <Form>
          <Form.Label>Enter Location</Form.Label>
          <Form.Control onChange={this.changeSearch} type="text" placeholder="Seattle" style={{ width: '40%', margin: '0 auto' }} />
          <Button variant="success" onClick={this.searchLocation}>Explore!</Button>
        </Form>
        {this.state.toggle ?
          <Card variant="success" style={{ width: '25rem', margin: '0 auto' }}>
            <Card.Img src={this.state.maps_url} alt="Google maps image" />
            <Card.Title>{this.state.data.display_name}</Card.Title>
            <Card.Text>Latitude: {this.state.data.lat}</Card.Text>
            <Card.Text>Longitude: {this.state.data.lon}</Card.Text>
          </Card>
          : ''
        }
        <Button onClick={this.getWeather}>Get weather data</Button>
        <Card>
          {this.state.dayArray.forEach(item => {
            { console.log(item) }
            return <DayCard
              day={item}
            />
          })}
        </Card>
      </div >
    );
  }
}

export default Main;
