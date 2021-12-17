
import React from "react";
import { Component } from "react";
import axios from "axios";

export class TripForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeTripId: sessionStorage.getItem("ACTIVE_ROW"),
            trip: {
                id: -1,
                name: "default",
                description: "default",
                dateStarted: "default",
                dateCompleted: "default"
            },
            loading: true
        };

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDateStarted = this.onChangeDateStarted.bind(this);
        this.onChangeDateCompleted = this.onChangeDateCompleted.bind(this);

        this.convertDate = this.convertDate.bind(this);
        this.onSubmit.bind(this);
    }

    /***
     * Load 
     */
    componentDidMount = () => {
        if (this.props.title === "Modify Trip") {
            this.populateTrip(this.state.activeTripId);
        }
    }

    populateTrip = (id) => {
        axios.get(`https://localhost:7269/api/Trips/GetTrip/${id}`)
            .then(res => {
                console.log(res);
                this.setState({ trip: res.data, loading: false });
                console.log("trip from state: ", this.state.trip);
            });
    }

    outputChange(stTrip) {
        this.setState({stTrip});
        console.log("updated: ", stTrip);
    }

    onChangeName(e) {
        let stTrip = this.state.trip;
        stTrip.name = e.target.value;
        this.outputChange(stTrip);
    }

    onChangeDescription(e) {
        let stTrip = this.state.trip;
        stTrip.description = e.target.value;
        this.outputChange(stTrip);
    }

    onChangeDateStarted(e) {
        let stTrip = this.state.trip;
        stTrip.dateStarted = e.target.value;
        this.outputChange(stTrip);
    }

    onChangeDateCompleted(e) {
        let stTrip = this.state.trip;
        stTrip.dateCompleted = e.target.value;
        this.outputChange(stTrip);
    }

    onSubmit = (e) => {
        e.preventDefault();

        if (this.props.title === "Modify Trip") {

            let tripObject = {
                Id: this.state.trip.id,
                Name: this.state.trip.name,
                Description: this.state.trip.description,
                DateStarted: this.state.trip.dateStarted,
                DateCompleted: this.state.trip.dateCompleted
            }

            console.debug("Modify Trip: ", tripObject);

            axios.put(`https://localhost:7269/api/Trips/UpdateTrip/${tripObject.Id}`, tripObject)
                .then(res => {
                    console.log(res.data);
                    this.setState({ trip: res.data, loading: false });
                });

                this.props.history.push('/trips');
        }
        else if (this.props.title === "Add Trip") {

            let tripObject = {
                Id: Math.floor(Math.random() * 1000),
                Name: this.state.name,
                Description: this.state.description,
                DateStarted: this.state.dateStarted,
                DateCompleted: this.state.dateCompleted
            }

            axios.post("https://localhost:7269/api/Trips/AddTrip", tripObject)
                .then(res => {
                    this.props.history.push('/trips');
                });

        }

    }

    /***
     * Get a date format that makes sense for the date picker. 
     */
    convertDate = (dateString) => {
        // new Date() will default to 1963 passed a null argument. The date picker will default
        // to today passed a null defaultValue, which is more useful. => returning null for that reason
        if (dateString === null)
        {
            return null;
        }
        let date = new Date(dateString);
        let day = ("0" + date.getDate()).slice(-2);
        let month = ("0" + (date.getMonth() + 1)).slice(-2);
        let result = date.getFullYear()+"-"+(month)+"-"+(day) ;
        console.log("date: ", result);
        return result;
    }


    render() {
        let content = this.state.loading ? (
            <p><em>Loading...</em></p>
        ) : (
            <div className="trip-form" >
                <h3>{this.props.title}</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Trip Name: </label>
                        <input type="text"
                            className="form-control"
                            defaultValue={this.state.trip.name}
                            onChange={this.onChangeName}
                             />
                    </div>
                    <div className="form-group">
                        <label>Description: </label>
                        <textarea type="text"
                            className="form-control"
                            defaultValue={this.state.trip.description}
                            onChange={this.onChangeDescription} />
                    </div>

                    <div className="row">
                        <div className="col col-md-6 col-sm-6 col-xs-12">
                            <div className="form-group">
                                <label>Start Date: </label>
                                <input type="date"
                                    className="form-control"
                                    defaultValue={this.convertDate(this.state.trip.dateStarted)}
                                    onChange={this.onChangeDateStarted}
                                />
                            </div>
                        </div>

                        <div className="col col-md-6 col-sm-6 col-xs-12">
                            <div className="form-group">
                                <label>Date of completion: </label>
                                <input type="date"
                                    className="form-control"
                                    defaultValue={this.convertDate(this.state.trip.dateCompleted)}
                                    onChange={this.onChangeDateCompleted} />
                            </div>
                        </div>
                    </div>

                    <div className="form-group submit-div">
                        <input type="submit" variant="primary" value="Save Trip" className="btn-primary" />
                    </div>
                </form>

            </div>);

        return (
            <>
                {content}
            </>
        );

    }
}