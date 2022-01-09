import axios from "axios";


export const GET_ALL_TRIPS_REQUEST = "GET_ALL_TRIPS_REQUEST";
export const GET_ALL_TRIPS_SUCCESS = "GET_ALL_TRIPS_SUCCESS";
export const GET_ALL_TRIPS_ERROR = "GET_ALL_TRIPS_ERROR";

const getTripsSuccess = payload => ({
    type: GET_ALL_TRIPS_SUCCESS,
    payload: payload
});

const getTripsError = payload => ({
    type: GET_ALL_TRIPS_ERROR,
    payload: payload
});

export const getAllTrips = () => async dispatch => {
    dispatch({ type: GET_ALL_TRIPS_REQUEST});
        try {
        const res = await axios.get('api/Trips/GetTrips');
        const response = res.data;
        dispatch(getTripsSuccess(response));
    } catch (error) {
        dispatch(getTripsError(`Something went wrong: ${error.message}`));
        return Promise.reject({});
    }
}