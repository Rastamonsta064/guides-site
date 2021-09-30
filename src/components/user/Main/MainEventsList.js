import React from 'react';
import MainEventsLI from "./MainEventsLI";


const MainEventsList = (props) => {

    return (
        <div className="container-fluid justify-content-center">
            {props.events.map(event => <MainEventsLI key={event._id} event={event}/>).reverse()}
        </div>
    );
}

export default MainEventsList;