import React from 'react';
import {useDispatch} from "react-redux";
import {addOrder, updateEventRegistered} from "../../../redux/actions";

const Payment = (props) => {
    const dispatch = useDispatch();
    return (
        <div className="container">
            <div className="row border m-2 p-2 bg-success text-dark bg-opacity-75 align-items-center">
                <div className="col">
                    <h2>Оплата</h2>
                </div>
            </div>
            <div className="row m-2 p-2 text-dark align-items-center">
                <div className="col text-center">
                    <p>Вы покупаете <strong>{props.order.orderQuantity}</strong> билет(ов)</p>
                    <p>На Экскурсию <strong>{props.eventName}</strong></p>
                    <p>Ваш заказ составил <strong>${props.order.orderTotal}</strong>.</p>
                    <button className="btn btn-success m-1" onClick={() => {
                        dispatch(addOrder(props.order));
                        let eventRegistered = Number(props.order.orderQuantity) + Number(props.eventRegistered);
                        dispatch(updateEventRegistered(props.order.orderEventId, {eventRegistered}));
                        props.setPaymentStatus(true);
                        props.setView("ThankYou");
                    }}>Оплатить
                    </button>
                    <button className="btn btn-secondary m-1" onClick={() => props.setView("Order")}>Отмена</button>
                </div>
            </div>

        </div>
    );
};

export default Payment;