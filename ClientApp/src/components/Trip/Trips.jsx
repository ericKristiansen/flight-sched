import React, {Component} from 'react';
import axios from 'axios';


export class Trips extends Component
{
    constructor(props){
        super(props);
        this.state = {
            trips: [], 
            loading: true,
            activeRow: -1
        }
        // Bind Methods to be used in HTML
        this.onRowClick = this.onRowClick.bind();
    }

    onRowClick = (e) => {
        this.setState({ activeRow: e.target.parentElement.getAttribute("value")}, this.afterStateChange);
    }

    afterStateChange = () => {
        console.log("row clicked: ", this.state.activeRow);
        sessionStorage.setItem("ACTIVE_ROW", this.state.activeRow);
        console.log("ACTIVE_ROW set: ", sessionStorage.getItem("ACTIVE_ROW"));
        const {history} = this.props;
        history.push('/modifytrip');
    }

    renderAllTripsTable(trips){
        return (
            <table className='table table-striped' variant="dark">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Date Started</th>
                        <th>Date Completed</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                    trips.map(trip => (
                        <tr key={trip.id} value={trip.id} onClick={this.onRowClick}>
                        <td>{trip.name}</td>
                        <td>{trip.description}</td>
                        <td>{trip.dateStarted.substring(0, 10)}</td>
                        <td>{trip.dateCompleted === null ? "NOT COMPLETED": trip.dateCompleted.substring(0, 10)}</td>
                        <td> MODIFY TRIP </td>
                    </tr>
                    ))
                    }
                    
                </tbody>
            </table>
        );
    }


    componentDidMount(){
        this.populateTripsData();
        console.log("did mount...");
    }


    populateTripsData(){
        axios.get('https://localhost:7269/api/Trips/GetTrips')
      .then(res => {
        const response = res.data;
        this.setState({ trips: response, loading: false });
        console.table(res);
      });
    }

    render()
    {
        let content = this.state.loading ? (
            <p><em>Loading...</em></p>
        ): (
            this.renderAllTripsTable(this.state.trips)
        );

        return (
        <div>
            <h1>All Trips</h1>
            <p>Here, you can see all trips. <em>Click on a trip to modify...</em></p>
            { content }
        </div>
        );
    }

}