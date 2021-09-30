import React from 'react';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {deleteGuide} from "../../../redux/actions";

const GuideItem = (props) => {

    const deleteGuideHandler = () => {
        if (window.confirm("Точно удаляем?")) {
            let id = props.guide._id;
            props.deleteGuideHandler(id);
        }
    }

    return (
        <tr>
            <th>{props.guide.guideName}</th>
            <th>{props.guideEventsCount(props.guide.guideName)}</th>
            <th>{props.guide.guideContact}</th>
            <th>
                <Link to={"/guides/" + props.guide._id}>
                    <button className="btn btn-secondary btn-sm m-1"><i className="bi bi-eye"></i></button>
                </Link>
                <Link to={"/edit_guide/" + props.guide._id}>
                    <button className="btn btn-secondary btn-sm m-1">edit</button>
                </Link>
                <button className="btn btn-secondary btn-sm m-1" onClick={deleteGuideHandler}>X</button>
            </th>
        </tr>
    );
}

const GuidesList = () => {

    const dispatch = useDispatch();
    const guides = useSelector(state => state.guides);
    const events = useSelector(state => state.events);

    const deleteGuideHandler = (id) => {
        dispatch(deleteGuide(id));
    }

    const guideEventsCount = (guideName) => {
        let tempEvents = events.filter(event => event.guideName === guideName);
        return tempEvents.length;
    }

    return (
        <div className="container-fluid justify-content-center">
            <div className="row p-2 m-2 bg-success bg-opacity-50">
                <h3>Список гидов-экскурсоводов</h3>
            </div>
            <div className="row p-2 m-2">
                <table className="table table-striped table-hover table-sm">
                    <thead>
                    <tr>
                        <th>Имя</th>
                        <th>Кол-во экскурсий</th>
                        <th>Телефон</th>
                        <th>Действия</th>
                    </tr>
                    </thead>
                    <tbody>
                    {guides.length > 0 ?
                        guides.map(guide => <GuideItem guideEventsCount={guideEventsCount} deleteGuideHandler={deleteGuideHandler} guide={guide}
                                                       key={guide._id}/>).reverse()
                        :
                        <tr>
                            <th>LOADING...</th>
                            <th>...</th>
                            <th>...</th>
                            <th>...</th>
                        </tr>
                    }
                    </tbody>
                </table>
            </div>
        </div>

    );
};

export default GuidesList;