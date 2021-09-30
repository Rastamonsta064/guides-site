import React from 'react';
import {Link} from "react-router-dom";

const AdminPanelHeader = () => {
    return (
        <div className="container-fluid justify-content-center">
            <div className="row m-2 p-2 bg-success bg-opacity-75 align-items-center">
                <div className="col">
                    <h1>Админ панель <span className="text-warning">Сайта Гидов</span></h1>
                    <Link to="/">
                        <button type="button" className="btn btn-warning m-1"> На главную</button>
                    </Link>
                    <Link to="/create_event">
                        <button className="btn btn-warning m-1">Создать Экскурсию</button>
                    </Link>
                    <Link to="/create_guide">
                        <button className="btn btn-warning m-1">Зарегистрировать гида</button>
                    </Link>
                    <Link to="/create_order/">
                        <button className="btn btn-warning m-1">Создать заказ</button>
                    </Link>

                </div>
            </div>
        </div>
    );
};

export default AdminPanelHeader;