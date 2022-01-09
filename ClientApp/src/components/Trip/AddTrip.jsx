import React, { Component } from 'react';
import { TripForm } from './TripForm';

export class AddTrip extends Component {

    render() {

        return (
            <>
                <TripForm title="Add Trip" history={this.props.history} />
            </>
        );
    }

}