/* eslint-disable */
import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';

class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      search: '',
      location: {},
      mapURL: '',
      weather: {},
      movies: {},
    }
  }

  fetchMapData = async () => {
    let response = await axios.get(`http://localhost:3030/map?lon=${this.state.location.lon}&lat=${this.state.location.lat}`);
    this.setState({ mapURL: response });
  }

  fetchLocationData = async () => {
    let response = await axios.get(`http://localhost:3030/location?searchQuery=${this.state.search}`);
    this.setState({ location: response.data });
    await this.fetchMapData();
  }

  fetchWeatherData = async () => {
    let response = await axios.get(`http://localhost:3030/weather?lon=${this.state.location.lon}&lat=${this.state.location.lat}`);
    this.setState({ weather: response });
  }

  fetchMovieData = async () => {
    let response = await axios.get(`http://localhost:3030/movies?lon=${this.state.location.lon}&lat=${this.state.location.lat}`);
    this.setState({ movies: response });
  }

  changeSearch = (e) => {
    this.setState({ search: e.target.value });
  }

  errorLog = (error) => {
    console.error(error);
  }

  render() {
    return (
      <div id="Main" >
        <Form>
          <Form.Label>Enter Location</Form.Label>
          <Form.Control onChange={this.changeSearch} type="text" placeholder="Search location here!" style={{ width: '40%', margin: '0 auto' }} />
          <Button variant="success" onClick={this.fetchLocationData}>Explore!</Button>
        </Form>
        <Card style={{ width: '25rem', margin: '0 auto' }}>
          <Card.Img src={this.state.mapURL.data} alt="Map image of location" />
          <Card.Title>{this.state.location.display_name}</Card.Title>
          <Card.Text>Latitude: {this.state.location.lat}</Card.Text>
          <Card.Text>Longitude: {this.state.location.lon}</Card.Text>
        </Card>
        <Button onClick={this.fetchWeatherData}>Get weather data</Button>
        <Card style={{ width: '25rem', margin: '0 auto' }}>
          <Card.Text>On {this.state.weather.datetime}</Card.Text>
          <Card.Text>The temp was: {this.state.weather.temp} celcius</Card.Text>
        </Card>
        <Button onClick={this.fetchMovieData}>Get Movie data</Button>
        <Card style={{ width: '25rem', margin: '0 auto' }}>
          <Card.Title variant="info">Top movie from this area:</Card.Title>
          <Card.Text>{this.state.movies.data}</Card.Text>
        </Card>
      </div >
    );
  }
}

export default Main;
