/* eslint-disable */
import React from 'react';
import Card from 'react-bootstrap/Card';

class RenderMovies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie1: '',
      movie2: '',
      movie3: '',
    };
  }

  render() {
    return (
      <Card style={{ width: '25rem', margin: '0 auto' }}>
        <Card.Title variant="info">Here are the top 3 movies from this area:</Card.Title>
        {this.props.movieData.slice(0, 3).map(movie => {
          return (
            <>
              <Card.Title>{movie.title}</Card.Title>
              <Card.Text>{movie.overview}</Card.Text>
              <Card.Footer>Released on {movie.released_on}</Card.Footer>
            </>
          )
        })}
      </Card>
    );
  }
}

export default RenderMovies;
