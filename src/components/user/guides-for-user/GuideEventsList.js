import React from 'react';
import {Link} from "react-router-dom";

function EventSmall(props) {

    const date = new Date(props.event.eventDate);

    return (
        <tr>
            <th>{props.event ? date.toLocaleDateString() : "xxx"}</th>
            <th>{props.event ? props.event.eventName : "xxx"}</th>
            <th>{props.event ? props.event.eventPrice : "xxx"}</th>
            <th>{props.event ? `${props.event.eventRegistered ? props.event.eventRegistered : 0}/${props.event.eventCapacity}` : "xxx"}</th>
            <th>
                <Link to={"/event/" + props.event._id}>
                    <button className="btn btn-secondary btn-sm m-1"><i className="bi bi-eye"></i></button>
                </Link>
            </th>
        </tr>
    )
}


const GuideEventsList = (props) => {

    const allEventsMapToTable = (events) => {
        return (
            events.length > 0 ?
                events.map(event => <EventSmall event={event}
                                                key={event._id}/>)
                :
                <tr>
                    <th>LOADING...</th>
                    <th>...</th>
                    <th>...</th>
                    <th>...</th>
                    <th>...</th>

                </tr>

        )
    }

    return (
        <div className="container-fluid justify-content-center">
            <div className="row p-2 m-2 bg-success bg-opacity-50">
                <div className="col-7">
                    <h4>Все Экскурсии {props.events[0] ? props.events[0].guideName : <></>}</h4>
                </div>
            </div>
            <div className="row p-2 m-2">
                <table className="table table-striped table-hover table-sm">
                    <thead>
                    <tr>
                        <th>Дата</th>
                        <th>Название</th>
                        <th>Цена</th>
                        <th>Места</th>
                        <th><button className="btn btn-secondary disabled" ><i className="bi bi-eye"></i></button></th>
                    </tr>
                    </thead>
                    <tbody>
                    {allEventsMapToTable(props.events)}
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default GuideEventsList;