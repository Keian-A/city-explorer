/* eslint-disable */
import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import RenderMap from './RenderMap.js';
import RenderMovies from './RenderMovies.js';
import RenderWeather from './RenderWeather.js';

class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      search: '',
      location: {},
      mapURL: '',
      weather: {},
      movies: '',
    }
  }

  fetchLocationData = async () => {
    let response = await axios.get(`${process.env.REACT_APP_SERVER}/location?searchQuery=${this.state.search}`);
    this.setState({ location: response.data });
    await this.fetchMapData();
    await this.fetchWeatherData();
    await this.fetchMovieData();
  }

  fetchMapData = async () => {
    let response = await axios.get(`${process.env.REACT_APP_SERVER}/map?lon=${this.state.location.lon}&lat=${this.state.location.lat}`);
    this.setState({ mapURL: response });
  }

  fetchWeatherData = async () => {
    let response = await axios.get(`${process.env.REACT_APP_SERVER}/weather?lon=${this.state.location.lon}&lat=${this.state.location.lat}`);
    this.setState({ weather: response.data[0] });
  }

  fetchMovieData = async () => {
    let response = await axios.get(`${process.env.REACT_APP_SERVER}/movies?searchQuery=${this.state.search}`);
    this.setState({ movies: response.data });
  }

  changeSearch = (e) => {
    this.setState({ search: e.target.value });
  }

  // Error handling function
  Error = () => {
    this.setState({ error: error.toString() })
    this.setState({ showError: true })
  }

  render() {
    return (
      <div id="Main" >
        <Form>
          <Form.Label>Enter Location</Form.Label>
          <Form.Control onChange={this.changeSearch} type="text" placeholder="Search location here!" style={{ width: '40%', margin: '0 auto' }} />
          <Button variant="success" onClick={this.fetchLocationData}>Explore!</Button>
        </Form>
        { this.state.movies ?
          <>
            <RenderMap
              mapURL={this.state.mapURL}
              location={this.state.location}
            />
            <RenderWeather
              displayDate={this.state.weather.datetime}
              displayappTemp={this.state.weather.app_temp}
              displayCloudLevel={this.state.weather.weather.description}
            />
            <RenderMovies
              movieData={this.state.movies}
            />
          </>
          : null}
      </div >
    );
  }
}

export default Main;
