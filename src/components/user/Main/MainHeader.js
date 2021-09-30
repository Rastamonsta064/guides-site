import React from 'react';
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";

const MainHeader = (props) => {

    const guides = useSelector(state => state.guides);

    return (
        <div className="container-fluid justify-content-center">
            <div className="row order m-2 p-2 bg-success bg-opacity-75 align-items-center">
                <div className="col">
                    <table className="table table-borderless">
                        <thead>
                        <tr>
                            <th>Гид</th>
                            <th>Город</th>
                            <th>Уровень</th>
                            <th>Все/Предстоящие</th>
                            <th><h2><i className="bi bi-clipboard-data text-warning"></i></h2></th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <th>
                                <select className="form-select" onChange={(e)=>{
                                    props.setGuide(e.target.value);
                                }}>
                                    <option hidden>Выбери гида</option>
                                    <option value="all" >Все</option>

                                    {guides.map((guide) => {
                                        return <option key={guide._id} value={guide.guideName}>{guide.guideName}</option>
                                    })}
                                </select>
                            </th>

                            <th>
                                <select className="form-select">
                                    <option hidden>Выберите город</option>
                                </select>
                            </th>
                            <th>
                                <select className="form-select">
                                    <option hidden>Выбери уровень</option>
                                    <option>Турист(обзорная)</option>
                                    <option>Местный(тематическая)</option>
                                    <option>Сам гидом могу</option>
                                    <option>Любой</option>
                                </select>
                            </th>
                            <th>
                                <div className="form-check form-switch">
                                    <input className="form-check-input bg-warning m-auto" type="checkbox"/>
                                </div>
                            </th>
                            <th>
                                <Link to="/admin">
                                    <button className="btn btn-warning btn-sm p-2 ">Админ панель</button>
                                </Link>
                            </th>
                        </tr>
                        </tbody>
                    </table>

                </div>
            </div>
        </div>

    );
};

export default MainHeader;