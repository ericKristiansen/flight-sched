import React, { Component } from 'react';

export class Home extends Component {
  static displayName = Home.name.toUpperCase();

  render () {
    return (
      <div>
        <h1>Welcome to Trip Scheduler</h1>

        <p>Here, you can perform the following actions:</p>
        <ul>
          <li>Add a new trip</li>
          <li>Update a trip</li>
          <li>Delete a trip</li>
          <li>Display all trips</li>
        </ul>
      </div>
    );
  }
}
