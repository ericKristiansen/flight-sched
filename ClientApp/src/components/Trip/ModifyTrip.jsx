import React, { Component } from 'react';
import axios from 'axios';
import { TripForm } from './TripForm';

 export class ModifyTrip extends Component
 {

    constructor(props){
        super(props);
        this.state = 
        { 
            activeTripId: sessionStorage.getItem("ACTIVE_ROW"),
            trip: {
                name: "default",
                description: "default",
                dateStarted: "default",
                dateCompleted: "default"
            },
            loading: true
        }
    }

    componentDidMount() {
        console.log("mounted modifytrips");
        this.populateTrip(this.state.activeTripId);
    }


    populateTrip = (id) => {
        console.log(`https://localhost:7269/api/Trips/GetTrip/${id}`);
        axios.get(`https://localhost:7269/api/Trips/GetTrip/${id}`)
        .then(res => {
            console.log(res);
            this.setState({ trip: res.data, loading: false });
            console.log("trip from state: ", this.state.trip);
        });
    }

    render(){
        // if not selected reroute back to trips

        let content = this.state.loading ? (
            <p><em>Loading... </em></p>
        ): (
            <TripForm title="Modify Trip" />
        );

    return (
        <>
            { content }
        </>
        );
    }

 }