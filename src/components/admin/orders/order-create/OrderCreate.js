import React, {useState} from 'react';
import {useHistory} from "react-router";
import OrderCreateForm from "./OrderCreateForm";
import OrderCreateConfirm from "./OrderCreateConfirm";

const OrderCreate = () => {

    const [view,setView] = useState(true);

    const [errorMes,setErrorMes] = useState("");

    const [order,setOrder] = useState({
        orderClientName: "",
        orderClientPhone: "",
        orderClientEmail: "",
        orderQuantity: 0,
        orderTotal: 0,
        orderEventId: ""
    });

    const history = useHistory();

    return (
        <>
            <div className="container-fluid justify-content-center">
                <div className="row order m-2 p-2 bg-success bg-opacity-75 align-items-center">
                    <div className="col">
                        <h1>Создание нового <span className="text-warning">заказа</span></h1>
                        <button className="btn btn-warning m-1" onClick={() => history.push("/admin")}>Отмена</button>
                    </div>
                    {errorMes ? <div className="col"><h2><strong><span
                        className="badge bg-warning text-success">{errorMes}</span></strong></h2></div> : <></>}
                </div>
            </div>
            {view ? <OrderCreateForm setErrorMes={setErrorMes} setView={setView} setOrder={setOrder} order={order}/> :
                <OrderCreateConfirm order={order}/>}
        </>
    );
};

export default OrderCreate;