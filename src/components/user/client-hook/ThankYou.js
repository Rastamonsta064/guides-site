import React from 'react';
import {Link} from "react-router-dom";

const ThankYou = (props) => {

    let ddMMyyyy = new Date(props.event.eventDate).toLocaleDateString();
    const url = "https://api.qrserver.com/v1/create-qr-code/?data="
    const qrInfo = url+"event_id:"+props.event._id+"_order_id:"+props.order._id;

    return (
        <div className="container">
            <div className="row border m-2 p-2 bg-success text-dark bg-opacity-75 align-items-center">
                <div className="col">
                    <h2>Ваш заказ оформлен и оплачен!</h2>
                    <Link to="/"><button className="btn btn-warning m-1">На главную</button></Link>
                    <button className="btn btn-warning m-1">Сохранить</button>
                </div>
            </div>
            <div className="row m-2 p-2 align-items-center">
                <div className="col text-center">
                    <h3>{props.event.eventName}</h3>
                    <h4>Дата: {ddMMyyyy}</h4>
                    <h4>Кол-во оплаченых мест: {props.order.orderQuantity}</h4>
                    <img src={qrInfo} alt="Ваш QR код"/>

                </div>
            </div>

        </div>
    );
};

export default ThankYou;