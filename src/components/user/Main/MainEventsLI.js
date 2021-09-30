import React from 'react';
import {Link} from "react-router-dom";

const MainEventsLI = (props) => {

    const dateFormatHandler = (date) => {
        let newDateString = new Date(date).toLocaleDateString();
        let newDateStringArr = newDateString.split(".");
        let month;
        switch (newDateStringArr[1]) {
            case "02":
                month = "Февраля";
                break;
            case "03":
                month = "Марта";
                break;
            case "04":
                month = "Апреля";
                break;
            case "05":
                month = "Май";
                break;
            case "06":
                month = "Июня";
                break;
            case "07":
                month = "Июля";
                break;
            case "08":
                month = "Августа";
                break;
            case "09":
                month = "Сентября";
                break;
            case "10":
                month = "Октября";
                break;
            case "11":
                month = "Ноября";
                break;
            case "12":
                month = "Декабря";
                break;
            default: {
                month = "Января"
            }

        }
        return `${newDateStringArr[0]} ${month}`
    }

    const durationStringHandler = (date) => {
        let newTime = new Date(date).toLocaleTimeString(undefined, {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        });
        let newTimeArr = newTime.split(":");
        return `${newTimeArr[0]}.${newTimeArr[1]} - ${Number(newTimeArr[0]) + Number(props.event.eventDuration)}.${newTimeArr[1]} (${props.event.eventDuration} часа)`
    }

    return (

        <div className="row border border-success m-2 p-2 bg-secondary text-dark bg-opacity-25 align-items-center">
            <div className="col">
                <img width="150" height="150" src={props.event.eventPhoto} alt="Event"
                     className="rounded mx-auto border border-success"/>
            </div>
            <div className="col-6">
                <h3>{props.event.eventName}</h3>
                <p>{props.event.eventShortDescription}</p>
                <hr/>
                <p> Уровень сложности материала: {props.event.eventDifficulty}</p>
            </div>
            <div className="col">
                <p>{dateFormatHandler(props.event.eventDate)}</p>
                <p>Ваш гид: {props.event.guideName}</p>
            </div>
            <div className="col p-0">
                <p><i className="bi bi-geo-alt-fill"></i> {props.event.eventCity}</p>
                <p><i className="bi bi-clock-fill"></i> {durationStringHandler(props.event.eventDate)}</p>
                <p><i className="bi bi-currency-exchange"></i> ${props.event.eventPrice}</p>
                <p><i className="bi bi-people-fill"></i> Осталось {props.event.eventCapacity - props.event.eventRegistered} мест(а)</p>
                <Link to={"/event/" + props.event._id}>
                    <button className="btn btn-success">Подробнее</button>
                </Link>
            </div>
        </div>
    )
}

export default MainEventsLI;