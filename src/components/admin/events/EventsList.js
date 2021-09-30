import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {dellEvent} from "../../../redux/actions";
import {Link} from "react-router-dom";

function EventSmall(props) {

    const date = new Date(props.event.eventDate);

    const deleteEventHandler = () => {
        if (window.confirm("Точно удаляем?")) {
            let id = props.event._id;
            props.deleteEventHandler(id);
        }
    }


    return (
        <tr>
            <th>{props.event ? date.toLocaleDateString() : "xxx"}</th>
            <th>{props.event ? props.event.eventName : "xxx"}</th>
            <th>{props.event ? props.event.eventPrice : "xxx"}</th>
            <th>{props.event ? `${props.event.eventRegistered ? props.event.eventRegistered : 0}/${props.event.eventCapacity}` : "xxx"}</th>
            <th>{props.event ? props.event._id : "xxx"}</th>

            <th>
                <Link to={"/event/" + props.event._id}>
                    <button className="btn btn-secondary btn-sm m-1"><i className="bi bi-eye"></i></button>
                </Link>
                <Link to={"/edit_event/" + props.event._id}>
                    <button className="btn btn-secondary btn-sm m-1">edit</button>
                </Link>
                <button className="btn btn-secondary btn-sm m-1" onClick={deleteEventHandler}>X</button>
            </th>
        </tr>
    )
}


const EventsList = () => {
    const events = useSelector(state => state.events);
    const guides = useSelector(state => state.guides);
    const dispatch = useDispatch();
    const [guideForFilter,setGuideForFilter] = useState("all");

    const deleteEventHandler = (id) => {
        dispatch(dellEvent(id))
    }
    const allEventsMapToTable = (events) => {
        return (
            events.length > 0 ?
                events.map(event => <EventSmall deleteEventHandler={deleteEventHandler} event={event}
                                                key={event._id}/>).reverse()
                :
                <tr>
                    <th>LOADING...</th>
                    <th>...</th>
                    <th>...</th>
                    <th>...</th>
                    <th>...</th>
                    <th>...</th>

                </tr>

        )
    }

    const filterEventsMapToTable = (guideName) =>{
        switch (guideName) {
            case "all":
                return events;
            default:
                return events.filter(event => event.guideName === guideName);
        }
    }

    return (
        <div className="container-fluid justify-content-center">
            <div className="row p-2 m-2 bg-success bg-opacity-50">
                <div className="col-7">
                    <h3>Все Экскурсии</h3>
                </div>
                <div className="col-1">

                </div>
                <div className="col-4">
                    <select  className="form-select m-1" onChange={(e) => setGuideForFilter(e.target.value)}>
                        <option value="all">Все</option>
                        {guides.map((guide) => {
                            return <option key={guide._id} value={guide.guideName}>{guide.guideName}</option>
                        })}
                    </select>
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
                        <th>ID</th>
                        <th>Действия</th>
                    </tr>
                    </thead>
                    <tbody>
                    {allEventsMapToTable(filterEventsMapToTable(guideForFilter))}
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default EventsList;