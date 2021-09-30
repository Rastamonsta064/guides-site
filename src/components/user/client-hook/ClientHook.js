import React, {useState} from 'react';
import {useSelector} from "react-redux";
import Payment from "./Payment";
import Event from "./Event";
import Order from "./Order";
import ThankYou from "./ThankYou";

const ClientHook = (props) => {
    const [view, setView] = useState("Event");//Event,Order,Payment,ThankYou
    const [order, setOrder] = useState({
        orderClientName: "",
        orderClientPhone: "",
        orderClientEmail: "",
        orderQuantity: 0,
        orderTotal: 0,
        orderEventId: props.match.params.id
    });
    const [paymentStatus, setPaymentStatus] = useState(false);
    const event = useSelector(state => state.events.find(event => event._id === props.match.params.id));

    switch (view) {
        case "ThankYou":
            return (<ThankYou paymentStatus={paymentStatus} order={order} event={event}/>)
        case "Payment":
            return (<Payment eventName={event.eventName} eventRegistered={event.eventRegistered} order={order} setView={setView} setPaymentStatus={setPaymentStatus}/>);
        case "Event":
            return (<Event event={event} setView={setView}/>);
        case "Order":
            return (<Order id={props.match.params.id} event={event} setOrder={setOrder} setView={setView}/>);
        default:
            return (<Event event={event} setView={setView}/>);
    }

};

export default ClientHook;