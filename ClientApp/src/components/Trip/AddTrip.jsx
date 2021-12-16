import React, { Component } from 'react';
import axios from 'axios';

export class AddTrip extends Component {
    constructor(props) {
        super(props);

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDateStarted = this.onChangeDateStarted.bind(this);
        this.onChangeDateCompleted = this.onChangeDateCompleted.bind(this);

        this.onSubmit.bind(this);

        this.state = {
            name: '',
            description: '',
            dateStarted: null,
            dateCompleted: null
        }
    }

    outputChange(val)
    {
        console.log(val + " : updated");
    }

    onChangeName(e){
        let val = e.target.value === null ? "": e.target.value; 
        this.setState({ name: val});
        this.outputChange();
    }

    onChangeDescription(e){
        this.setState({ description: e.target.value});
        this.outputChange();
    }

    onChangeDateStarted(e){
        this.setState({ dateStarted: e.target.value});
        this.outputChange();
    }

    onChangeDateCompleted(e){
        this.setState({ dateCompleted: e.target.value});
        this.outputChange();
    }

    onSubmit = (e) => {
        e.preventDefault();
        const {history} = this.props;

        let tripObject = {
            Id: Math.floor(Math.random() * 1000),
            Name: this.state.name,
            Description: this.state.description,
            DateStarted: this.state.dateStarted,
            DateCompleted: this.state.dateCompleted
        }

        axios.post("https://localhost:7269/api/Trips/AddTrip", tripObject)
        .then(res => {
            history.push('/trips');
        });

    }


    render() {
        return (
            <div className="trip-form" >
                <h3>Add New Trip</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Trip Name: </label>
                        <input type="text" 
                        className="form-control" 
                        value={this.state.name} 
                        onChange={this.onChangeName} />
                    </div>
                    <div className="form-group">
                        <label>Description: </label>
                        <textarea type="text" 
                        className="form-control" 
                        value={this.state.description} 
                        onChange={this.onChangeDescription} />
                    </div>

                    <div className="row">
                        <div className="col col-md-6 col-sm-6 col-xs-12">
                            <div className="form-group">
                                <label>Start Date: </label>
                                <input type="date" 
                                className="form-control" 
                                value={this.state.dateStarted} 
                                onChange={this.onChangeDateStarted}
                                />
                            </div>
                        </div>

                        <div className="col col-md-6 col-sm-6 col-xs-12">
                            <div className="form-group">
                                <label>Date of completion: </label>
                                <input type="date" 
                                className="form-control" 
                                value={this.state.dateCompleted} 
                                onChange={this.onChangeDateCompleted} />
                            </div>
                        </div>
                    </div>

                    <div className="form-group submit-div">
                        <input type="submit" variant="primary" value="Add Trip" className="btn-primary" />
                    </div>
                </form>

            </div>
        );
    }

}