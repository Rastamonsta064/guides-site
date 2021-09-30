import React, {useState} from 'react';
import {Link} from "react-router-dom";
import MainEventsLI from "../Main/MainEventsLI";

const Order = (props) => {

    const [errorMessage, setErrorMessage] = useState("");
    const [newOrder, setNewOrder] = useState({
        clientName: "",
        clientPhone: "",
        clientEmail: "",
        orderQuantity: 1,
        orderTotal: 0,
        eventId: props.id
    });

    let ticketsAvailable = props.event.eventCapacity - props.event.eventRegistered;

    // const dateFormatHandler = (date) => {
    //     let newDateString = new Date(date).toLocaleDateString();
    //     let newDateStringArr = newDateString.split(".");
    //     let month;
    //     switch (newDateStringArr[1]) {
    //         case "02":
    //             month = "Февраля";
    //             break;
    //         case "03":
    //             month = "Марта";
    //             break;
    //         case "04":
    //             month = "Апреля";
    //             break;
    //         case "05":
    //             month = "Май";
    //             break;
    //         case "06":
    //             month = "Июня";
    //             break;
    //         case "07":
    //             month = "Июля";
    //             break;
    //         case "08":
    //             month = "Августа";
    //             break;
    //         case "09":
    //             month = "Сентября";
    //             break;
    //         case "10":
    //             month = "Октября";
    //             break;
    //         case "11":
    //             month = "Ноября";
    //             break;
    //         case "12":
    //             month = "Декабря";
    //             break;
    //         default: {
    //             month = "Января"
    //         }
    //
    //     }
    //     return `${newDateStringArr[0]} ${month}`
    // }
    //
    // const durationStringHandler = (date) => {
    //     let newTime = new Date(date).toLocaleTimeString(undefined, {
    //         hour: '2-digit',
    //         minute: '2-digit',
    //         second: '2-digit',
    //     });
    //     let newTimeArr = newTime.split(":");
    //     return `${newTimeArr[0]}.${newTimeArr[1]} - ${Number(newTimeArr[0]) + Number(props.event.eventDuration)}.${newTimeArr[1]} (${props.event.eventDuration} часа)`
    // }

    return (
        <div>
            <div className="container ">
                <div className="row border m-2 p-2 bg-success text-dark bg-opacity-75 align-items-center">
                    <div className="col-8">
                        <h2>Записаться и оплатить</h2>
                    </div>
                    <div className="col-4">
                        <Link to="/">
                            <button className="btn btn-warning m-1">На Главную</button>
                        </Link>
                        <button className="btn btn-warning m-1" onClick={() => props.setView("Event")}>
                            Отмена
                        </button>
                    </div>

                </div>
                <MainEventsLI event={props.event}/>
                <div className="row m-2 p-2 justify-content-center">
                    {errorMessage ? <div className="col-3 alert alert-danger">{errorMessage}</div> : ""}
                </div>
                <div className="row m-2 p-2">
                    <div className="col-2"></div>
                    <div className="col">
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="yourName">
                                <i className="bi bi-person-square"></i>
                            </span>
                            <input
                                aria-describedby="yourName"
                                className="form-control"
                                placeholder="Ваше Имя"
                                required type="text"
                                onChange={(e) =>
                                    setNewOrder({...newOrder, clientName: e.target.value})}/>
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="yourPhone">
                                <i className="bi bi-telephone-fill"></i>
                            </span>
                            <input
                                aria-describedby="yourPhoneName"
                                className="form-control"
                                placeholder="Ваш номер телефона"
                                required type="text"
                                onChange={(e) =>
                                    setNewOrder({...newOrder, clientPhone: e.target.value})}/>
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="yourEmail">
                                <i className="bi bi-envelope-fill"></i>
                            </span>
                            <input
                                aria-describedby="yourEmail"
                                className="form-control"
                                placeholder="Ваш e-mail"
                                required type="text"
                                onChange={(e) =>
                                    setNewOrder({...newOrder, clientEmail: e.target.value})}/>
                        </div>


                    </div>
                    <div className="col-2">
                        <p>Осталось мест: {ticketsAvailable}</p>
                        <label> Кол-во: </label>
                        <input className="form-control d-grid" value={newOrder.orderQuantity} type="number" min="1"
                               max={ticketsAvailable}
                               onChange={(e) => {
                                   setNewOrder({...newOrder, orderQuantity: e.target.value});
                               }}/>
                        <br/>
                        <p>Итого: ${newOrder.orderQuantity * props.event.eventPrice}</p>
                    </div>
                    <div className="col-2">

                    </div>


                </div>
                <div className="row m-2 p-2 justify-content-center">
                    <div className="col-2">
                        <button className="btn btn-success" onClick={() => {
                            if (newOrder.clientName && newOrder.clientPhone && newOrder.clientEmail) {
                                props.setOrder({
                                    orderClientName: newOrder.clientName,
                                    orderClientPhone: newOrder.clientPhone,
                                    orderClientEmail: newOrder.clientEmail,
                                    orderQuantity: newOrder.orderQuantity,
                                    orderTotal: newOrder.orderQuantity * props.event.eventPrice,
                                    orderEventId: props.id
                                });
                                props.setView("Payment");
                            } else {
                                setErrorMessage("Заполните все поля.");
                            }

                        }}>К оплате
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Order;