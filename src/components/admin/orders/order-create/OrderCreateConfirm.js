import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import MainEventsLI from "../../../user/Main/MainEventsLI";
import {addOrder, updateEventRegistered} from "../../../../redux/actions";
import {useHistory} from "react-router";

const OrderCreateConfirm = (props) => {
    const events = useSelector(state => state.events);
    const event = events.find(event => event._id = props.order.orderEventId);

    const dispatch = useDispatch();
    const history = useHistory();

    const url = "https://api.qrserver.com/v1/create-qr-code/?data="
    const qrInfo = url + "event_id:" + event._id + "_clientName:" + props.order.orderClientName;

    const saveOrder = () => {
        dispatch(addOrder(props.order));
        let eventRegistered = Number(props.order.orderQuantity) + Number(event.eventRegistered);
        dispatch(updateEventRegistered(props.order.orderEventId, {eventRegistered}));
        history.push("/admin");
    }

    return (
        <div className="container">
            <div className="row m-2 p-2 justify-content-center">
                <div className="col-6">
                    <h3>Проверьте информацию о заказе</h3>
                    <p>Имя заказчика: {props.order.orderClientName}</p>
                    <p>Телефон заказчика: {props.order.orderClientPhone}</p>
                    <p>E-mail закзачика: {props.order.orderClientEmail}</p>
                    <p>Колличество оплаченных билетов: {props.order.orderQuantity}</p>
                    <p>Сумма заказа: {props.order.orderTotal}</p>
                    <p>Событие: {event.eventName}</p>
                </div>
                <div className="col-4 "><img src={qrInfo} alt="Ваш QR код"/>
                    <button className="btn btn-success m-1" onClick={saveOrder}>Оплатить</button>
                </div>


            </div>
            <MainEventsLI event={event}/>
        </div>
    );
};

export default OrderCreateConfirm;