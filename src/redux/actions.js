export const SET_EVENTS = "SET_EVENTS";
export const SET_GUIDES = "SET_GUIDES";
export const DELL_EVENT = "DELL_EVENT";
export const SET_ORDERS = "SET_ORDERS";
const url = "https://guides-site-server.herokuapp.com/";

//   ----------------EVENTS----------------------

export const setEvents = (eventsArr) => ({
    type: SET_EVENTS,
    payload: eventsArr
})

export const getEvents = () => {
    return (dispatch) => {
        fetch(url +"events/", {method: "GET"})
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error(response.status.toString());
                }
            })
            .then(eventsArr => dispatch(setEvents(eventsArr)))
            .catch(err => console.log(err.message));
    }
}


export const deleteEvent = (id) => ({
    type: DELL_EVENT,
    payload: id
})

export const dellEvent = (id) => {
    return (dispatch) => {
        fetch(url + "events/" + id, {method: "DELETE"})
            .then(response => {
                if (response.ok) {
                    dispatch(deleteEvent(id));
                    console.log(`Event with id: ${id} deleted`);
                } else {
                    throw new Error(response.status.toString());
                }
            })
    }
}

export const createEvent = (newEvent) => {
    return (dispatch) => {
        fetch(url + "events/add", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newEvent)
        })
            .then(response => {
                if (response.ok) {
                    console.log(response.json());
                } else {
                    throw new Error(response.status.toString());
                }
            })
            .then(() => dispatch(getEvents()))
            .catch(err => console.log(err));
    }
}

export const updateEvent = (id, updatedEvent) => {
    return (dispatch) => {
        fetch(url + "events/update/" + id, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedEvent)
        })
            .then(response => {
                if (response.ok) {
                    console.log(response.json());
                } else {
                    throw new Error(response.status.toString());
                }
            })
            .then(() => dispatch(getEvents()))
            .catch(err => console.log(err));
    }
}

export const updateEventRegistered = (id, updatedEventReg) => {
    return (dispatch) => {
        fetch(url + "events/patch_registered/" + id, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedEventReg)
        })
            .then(response => {
                if (response.ok) {
                    console.log(response.json());
                } else {
                    throw new Error(response.status.toString());
                }
            })
            .then(() => dispatch(getEvents()))
            .catch(err => console.log(err));
    }
}

//   ----------------GUIDES----------------------


export const setGuides = (guidesArr) => ({
    type: SET_GUIDES,
    payload: guidesArr
})

export const getGuides = () => {
    return (dispatch) => {
        fetch(url + "guides/", {method: "GET"})
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error(response.status.toString());
                }
            })
            .then(guidesArr => dispatch(setGuides(guidesArr)))
            .catch(err => console.log(err));
    }
}

export const createGuide = (newGuide) => {
    return (dispatch) => {
        fetch(url+"guides/add", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newGuide)
        })
            .then(response => {
                if (response.ok) {
                    console.log(response.json());
                } else {
                    throw new Error(response.status.toString());
                }
            })
            .then(() => dispatch(getGuides()))
            .catch(err => console.log(err));
    }
}

export const updateGuide = (id, updatedGuide) => {
    return (dispatch) => {

        fetch(url+"guides/update/" + id, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedGuide)
        })
            .then(response => {
                if (response.ok) {
                    console.log(response.json());
                } else {
                    throw new Error(response.status.toString());
                }
            })
            .then(() => dispatch(getGuides()))
            .catch(err => console.log(err));
    }
}


export const deleteGuide = (id) => {
    return (dispatch) => {
        fetch(url+"guides/" + id, {method: "DELETE"})
            .then(response => {
                if (response.ok) {
                    dispatch(getGuides());
                    console.log(`Guide with id: ${id} deleted`);
                } else {
                    throw new Error(response.status.toString());
                }
            })
    }
}

// ------------------------ ORDERS ---------------------------------

export const setOrders = (ordersArr) => ({
    type: SET_ORDERS,
    payload: ordersArr
})

export const getOrders = () => {
    return (dispatch) => {
        fetch(url+"orders/", {method: "GET"})
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error(response.status.toString());
                }
            })
            .then(ordersArr => dispatch(setOrders(ordersArr)))
            .catch(err => console.log(err.message));
    }
}

export const addOrder = (order) => {
    return (dispatch) => {
        fetch(url+"orders/add", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
        })
            .then(response => {
                if (response.ok) {
                    console.log(response.json());
                } else {
                    throw new Error(response.status.toString());
                }
            })
            .then(() => dispatch(getOrders()))
            .catch(err => console.log(err));
    }
}

export const dellOrder = (id, eventId, orderQuantity) => {
    return (dispatch) => {
        fetch(url+"orders/" + id, {method: "DELETE"})
            .then(response => {
                if (response.ok) {
                    fetch(url +"events/" + eventId,{method: "GET"})
                        .then(response => {
                            if (response.ok) {
                                return response.json();
                            } else {
                                throw new Error(response.status.toString());
                            }
                        })
                        .then(event => {
                            let updatedEventReg = Number(event.eventRegistered) - Number(orderQuantity);
                            dispatch(updateEventRegistered(eventId, {eventRegistered:updatedEventReg}));
                        });
                    dispatch(getOrders());
                    console.log(`Order with id: ${id} deleted`);
                } else {
                    throw new Error(response.status.toString());
                }
            })
    }
}