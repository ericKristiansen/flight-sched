
import React, { Component } from "react";
import axios from "axios";
import './trip.css';


export class DeleteConfirmation extends Component {

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
            loading: true,
            show: false
        };

        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }

    /***
 * Load 
 */
    componentDidMount = () => {
        this.populateTrip(this.state.activeTripId);
    }

    populateTrip = (id) => {
        axios.get(`https://localhost:7269/api/Trips/GetTrip/${id}`)
            .then(res => {
                console.log(res);
                this.setState({ trip: res.data, loading: false, show: true });
                console.log("trip from state: ", this.state.trip);
            });
    }

    onDelete = (e) => {
        e.preventDefault();
        const {history} = this.props;
        let id = this.state.trip.id;

        console.debug("Delete Trip ID: ", id);

        axios.delete(`https://localhost:7269/api/Trips/DeleteTrip/${id}`)
            .then(res => {
                console.log(res.data);
                this.setState({ trip: res.data, loading: false }, history.push('/trips'));
            });
    } 

    onCancel = (e) => {
        const {history} = this.props;
        history.push('/trips');
    }

    showModal = () => {
        this.setState({ show: true });
    };

    hideModal = () => {
        this.setState({ show: false });
    };

    render() {
        let content = (
            <div className="trip-form">
            <h3>Delete this Trip?</h3>
                <p>
                   {this.state.trip.name}
                </p>
                <p>{this.state.trip.description}</p>


                <div className="delete-div">
                <div className="form-group submit-div btn-div">
                            <input type="button" variant="primary" onClick={this.onCancel} value="Cancel" className="btn-secondary" />
                        </div>

                        <div className="form-group submit-div btn-div">
                            <input type="button" variant="primary" onClick={this.onDelete} value="Delete" className="btn-danger" />
                        </div>
                </div>
            </div>
        );
        return (
            <>
                {content}
            </>
        );
    }


}
