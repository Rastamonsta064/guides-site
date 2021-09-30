import {DELL_EVENT, SET_EVENTS, SET_GUIDES, SET_ORDERS} from "./actions";

const initialState = {
    user: "admin",
    events:[],
    guides:[],
    orders:[]
};
export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_EVENTS:
            return {...state, events: action.payload};
        case SET_GUIDES:
            return {...state, guides: action.payload};
        case DELL_EVENT:
            return {...state, events: state.events.filter(event => event._id !== action.payload)};
        case SET_ORDERS:
            return {...state, orders: action.payload};
        default:
            return state
    }
}