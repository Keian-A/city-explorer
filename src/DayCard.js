import React from 'react';
import Card from 'react-bootstrap/Card'

class DayCard extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Card.Text>{this.props.day}</Card.Text>
    )
  }
}

export default DayCard;