import React from 'react';
import {useHistory} from "react-router-dom";
import {useSelector} from "react-redux";

const OrderPage = (props) => {

    const history = useHistory();
    const order = useSelector(state => state.orders.find(order => order._id === props.match.params.id));

    const url = "https://api.qrserver.com/v1/create-qr-code/?data="

    return (
        <>
            <div className="container-fluid justify-content-center">
                <div className="row order m-2 p-2 bg-success bg-opacity-75 align-items-center">
                    <div className="col">
                        <h1>Информациия о <span className="text-warning">заказе</span></h1>
                        <button className="btn btn-warning m-1">Сохранить</button>
                        <button className="btn btn-warning m-1" onClick={() => history.push("/admin")}>Отмена</button>
                    </div>
                </div>
            </div>
            <div className="container justify-content-center">
                <div className="row m-2 p-2 align-items-center">
                    <div className="col text-center">
                        <h4>Имя клиента: {order ? order.orderClientName : "...loading"}</h4>
                        <h5>Кол-во оплаченых мест: {order ? order.orderQuantity : "...loading"}</h5>
                        <h5>Телефон клиента: {order ? order.orderClientPhone : "...loading"}</h5>
                        <h5>E-mail клиента: {order ? order.orderClientEmail : "...loading"}</h5>
                        <h5>Всего оплачено: ${order ? order.orderTotal : "...loading"}</h5>
                        <img src={order ? url+"event_id:"+order.orderEventId+"_clientName:"+order.orderClientName : ""} alt="Ваш QR код"/>

                    </div>
                </div>
            </div>
        </>
    );
};

export default OrderPage;