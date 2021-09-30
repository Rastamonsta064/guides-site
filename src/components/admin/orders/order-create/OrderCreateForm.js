import React, {useState} from 'react';
import MainEventsLI from "../../../user/Main/MainEventsLI";
import {useSelector} from "react-redux";

const OrderCreateForm = (props) => {

    const events = useSelector(state => state.events);
    const [event, setEvent] = useState({});
    const [newOrder, setNewOrder] = useState({orderQuantity:0});

    let ticketsAvailable = event._id ? event.eventCapacity - event.eventRegistered : null;

    const saveOrder = () => {
        if (newOrder.orderClientName && newOrder.orderClientPhone
            && newOrder.orderClientEmail && newOrder.orderQuantity) {
            props.setOrder({
                orderClientName: newOrder.orderClientName,
                orderClientPhone: newOrder.orderClientPhone,
                orderClientEmail: newOrder.orderClientEmail,
                orderQuantity: newOrder.orderQuantity,
                orderTotal: newOrder.orderQuantity * event.eventPrice,
                orderEventId: event._id
            });
            props.setView(false);
        } else {
            props.setErrorMes("Заполните все поля, блеать!");
        }
    }

    return (
        <div className="container justify-content-center">
            <div className="row m-2 p-2">
                <div className="col">
                    <div className="input-group mb-3">
                        <select className="form-select m-1" onChange={(e) => {
                            setNewOrder({...newOrder, eventId: e.target.value});
                            let event = events.find(event => event._id === e.target.value);
                            setEvent(event);
                            console.log(event.eventCapacity - event.eventRegistered);
                        }}>
                            <option hidden >Выберите событие, блеать!</option>
                            {events.map((event) => {
                                return <option key={event._id} value={event._id}>{event.eventName}</option>
                            })}
                        </select>
                    </div>
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
                                setNewOrder({...newOrder, orderClientName: e.target.value})}/>
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
                                setNewOrder({...newOrder, orderClientPhone: e.target.value})}/>
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
                                setNewOrder({...newOrder, orderClientEmail: e.target.value})}/>
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
                    {newOrder.orderQuantity ? <p>Итого: ${newOrder.orderQuantity * event.eventPrice}</p> : <></>}
                </div>
                <div className="col-4">
                    <p>Вы покупаете <strong>{newOrder.orderQuantity}</strong> билет(ов)</p>
                    <p>Ваш заказ
                        составил <strong>${newOrder.orderQuantity ? newOrder.orderQuantity * event.eventPrice : 0}</strong>.
                    </p>
                    {event._id && (Number(event.eventCapacity) - Number(event.eventRegistered)) > 0 ? <button className="btn btn-success" onClick={saveOrder}>К оплате</button> : <></>}
                    {event._id && (Number(event.eventCapacity) - Number(event.eventRegistered)) <= 0 ? <p><span
                        className="badge bg-success text-warning">Все места заняты</span></p> : <></>}
                </div>
            </div>

            <div className="row justify-content-center m-1 p-1">
                <div>
                    {event._id  ? <MainEventsLI event={event}/> : <></>}
                </div>
            </div>
        </div>
    );
};

export default OrderCreateForm;