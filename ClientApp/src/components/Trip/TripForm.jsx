
import React from "react";
import { Component } from "react";
import axios from "axios";
import './trip.css'

export class TripForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeTripId: sessionStorage.getItem("ACTIVE_ROW"),
            trip: {
                id: -1,
                name: "",
                description: "",
                dateStarted: null,
                dateCompleted: null
            },
            loading: true
        };

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDateStarted = this.onChangeDateStarted.bind(this);
        this.onChangeDateCompleted = this.onChangeDateCompleted.bind(this);

        this.getDeleteButtonClasses = this.getDeleteButtonClasses.bind(this);
        this.deleteThisTrip = this.deleteThisTrip.bind(this);
        this.convertDate = this.convertDate.bind(this);
        this.onSubmit.bind(this);
    }


    getDeleteButtonClasses = () => {
        let cl = this.props.title === "Modify Trip" ? "btn-danger" : "btn-danger hide-me";
        return cl;
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
        this.setState({ stTrip });
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

    deleteThisTrip = (e) => {

        e.preventDefault();
        
        const {history} = this.props
        history.push('/deleteConfirmation');

    }

    onSubmit = (e) => {
        e.preventDefault();
        const { history } = this.props;

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
                    this.setState({ trip: res.data, loading: false }, history.push('/trips'));
                });

        }
        else if (this.props.title === "Add Trip") {

            console.log("Add Trip...");

            let tripObject = {
                Id: Math.floor(Math.random() * 1000),
                Name: this.state.trip.name,
                Description: this.state.trip.description,
                DateStarted: this.state.trip.dateStarted,
                DateCompleted: this.state.trip.dateCompleted
            }

            console.log("tripObject: " + JSON.stringify(tripObject));

            axios.post("https://localhost:7269/api/Trips/AddTrip", tripObject)
                .then(res => {
                    console.log(res.data);
                    history.push('/trips');
                });
        }

    }

    /***
     * Get a date format that makes sense for the date picker. 
     */
    convertDate = (dateString) => {
        if (dateString === null) { return null; }
        return new Date(dateString).toISOString().slice(0, 10);
    }


    render() {

        let content = (
            <div className="trip-form" >
                <h3>{this.props.title}</h3>
                <hr/>
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

                    <div className="submit-group-div">

                        <div className="form-group submit-div btn-div">
                            <input type="submit" variant="primary" value="Save Trip" className="btn-primary" />
                        </div>

                        <div className="form-group submit-div btn-div">
                            <input type="button" variant="primary" onClick={this.deleteThisTrip} value="Delete Trip" className={this.getDeleteButtonClasses()} />
                        </div>

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