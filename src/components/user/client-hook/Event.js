import React from 'react';
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {getEvents} from "../../../redux/actions";

const Event = ({setView, event}) => {

    const dispatch = useDispatch();

    const durationStringHandler = (date) => {
        let newTime = new Date(date).toLocaleTimeString(undefined, {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        });
        let newTimeArr = newTime.split(":");
        return `${newTimeArr[0]}.${newTimeArr[1]} - ${Number(newTimeArr[0]) + Number(event.eventDuration)}.${newTimeArr[1]} (${event.eventDuration} часа)`
    }

    if (event) {
        return (
            <>
                <div className="container-fluid justify-content-center">
                    <div className="row order m-2 p-2 bg-success bg-opacity-75 align-items-center">
                        <div className="col">
                            <h1>Сайт <span className="text-warning">Гидов</span></h1>
                            <button className="btn btn-warning m-1" onClick={() => setView("Order")}>Записаться</button>
                            <Link to="/">
                                <button className="btn btn-warning m-1">На главную</button>
                            </Link>
                        </div>
                        <div className="col text-center">
                            <h2>{event.eventName}</h2>
                            <h4><span className="text-warning">Гид</span> события: {event.guideName}</h4>
                        </div>
                    </div>
                </div>
                <div className="container-fluid">
                    <div className="row m-2 p-2">
                        <div className="col-4">
                            <img src={event.eventPhoto} alt="Event" width="300" height="300"
                                 className="rounded mx-auto"/>
                        </div>
                        <div className="col-8">
                            <p>{event.eventShortDescription}</p>
                            <div className="col p-0">
                                <p><i className="bi bi-geo-alt-fill"></i> {event.eventCity}</p>
                                <p><i className="bi bi-clock-fill"></i> {durationStringHandler(event.eventDate)}</p>
                                <p><i className="bi bi-currency-exchange"></i> {event.eventPrice}</p>
                                <p><i className="bi bi-people-fill"></i> Осталось {event.eventCapacity - event.eventRegistered} мест(а)
                                </p>
                            </div>
                            <p>{event.eventFullDescription}</p>
                            <hr/>
                            <h4>Где встречаемся?</h4>
                            <p>{event.eventMeetingPoint}</p>
                            <p><i className="bi bi-info-circle-fill"></i> {event.eventAdditionalInfo}</p>
                            <p><i className="bi bi-emoji-sunglasses-fill"></i> Уровень сложности
                                материала: {event.eventDifficulty}</p>
                        </div>
                    </div>
                </div>
            </>

        );
    } else {
        dispatch(getEvents());
        return (
            <div className="container-fluid justify-content-center">
                <div className="row order m-2 p-2 bg-success bg-opacity-75 align-items-center">
                    <h1>Loading</h1>
                    <div className="d-flex justify-content-center">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default Event;