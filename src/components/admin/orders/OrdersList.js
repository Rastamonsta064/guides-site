import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {dellOrder} from "../../../redux/actions";

function OrderSmall(props) {

    const date = new Date(props.order.createdAt);

    const dispatch = useDispatch();

    const deleteOrderHandler = () => {
        dispatch(dellOrder(props.order._id, props.order.orderEventId, props.order.orderQuantity));
    }

    return (
        <tr>
            <th>{props.order ? date.toLocaleDateString() : "xxx"}</th>
            <th>{props.order ? props.order.orderClientName : "xxx"}</th>
            <th>{props.order ? props.order.orderClientPhone : "xxx"}</th>
            <th>{props.order ? props.order.orderClientEmail : "xxx"}</th>
            <th>{props.order ? props.order.orderEventId : "xxx"}</th>
            <th>{props.order ? props.order.orderQuantity : "xxx"}</th>
            <th>{props.order ? `${props.order.orderTotal}` : "xxx"}</th>
            <th>
                <button className="btn btn-secondary btn-sm m-1" onClick={deleteOrderHandler}>X</button>
                <Link to={"/orders/" + props.order._id}>
                    <button className="btn btn-secondary btn-sm m-1"><i className="bi bi-eye"></i></button>
                </Link>
            </th>
        </tr>
    )
}


const OrdersList = () => {
    const orders = useSelector(state => state.orders);
    const events = useSelector(state => state.events);

    const [eventIDForFilter, setEventIDForFilter] = useState("all");

    const allOrdersToMapToTable = (orders) => {
        return (
            orders.length > 0 ?
                orders.map(order => <OrderSmall order={order} key={order._id}/>).reverse()
                :
                <tr>
                    <th>LOADING...</th>
                    <th>...</th>
                    <th>...</th>
                    <th>...</th>
                    <th>...</th>
                    <th>...</th>
                    <th>...</th>
                    <th>...</th>
                </tr>
        )
    }

    const ordersToShowByID = (id) => {
        switch (id) {
            case "all":
                return orders;
            default:
                return orders.filter(order => order.orderEventId === id);
        }
    }

    return (
        <div className="container-fluid justify-content-center">
            <div className="row p-2 m-2 bg-success bg-opacity-50">
                <div className="col">
                    <h3>Все Заказы</h3>
                </div>
                <div className="col">
                    <select className="form-select m-1" onChange={(e) => {
                        setEventIDForFilter(e.target.value);
                    }}>
                        <option value="all">Все</option>
                        {events.map((event) => {
                            return <option key={event._id} value={event._id}>{event.eventName}</option>
                        })}
                    </select>
                </div>
            </div>
            <div className="row p-2 m-2">
                <table className="table table-striped table-hover table-sm">
                    <thead>
                    <tr>
                        <th>Дата</th>
                        <th>Имя клиента</th>
                        <th>Телефон</th>
                        <th>E-mail</th>
                        <th>ID события</th>
                        <th>Кол-во</th>
                        <th>Сумма</th>
                        <th>Действие</th>
                    </tr>
                    </thead>
                    <tbody>
                    {allOrdersToMapToTable(ordersToShowByID(eventIDForFilter))}
                    </tbody>
                </table>
            </div>
        </div>

    );
};

export default OrdersList;