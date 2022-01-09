import { combineReducers } from "redux";
import tripsReducer from "./tripReducers";


const rootReducer = combineReducers({
    trips: tripsReducer
});

export default rootReducer;