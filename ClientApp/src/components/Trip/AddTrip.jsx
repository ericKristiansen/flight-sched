import React, { Component } from 'react';
import axios from 'axios';
import { TripForm } from './TripForm';

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

        let content = (
            <TripForm title="Add Trip" history={this.props.history}/>
        );

    return (
        <>
            { content }
        </>
        );
    }

}