import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {updateEvent} from "../../../redux/actions";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import FileBase64 from "react-file-base64";
import {useHistory} from "react-router";


const EditEvent = (props) => {

    const events = useSelector(state => state.events);

    const guides = useSelector(state => state.guides);

    const dispatch = useDispatch();

    const history = useHistory();

    const [editedEvent, setEditedEvent] = useState({
        eventDate: "",
        eventDuration: 0,
        eventName: "",
        eventShortDescription: "",
        eventFullDescription: "",
        eventMeetingPoint: "",
        eventAdditionalInfo: "",
        eventCity: "",
        eventDifficulty: "",
        eventCapacity: 0,
        eventRegistered: 0,
        eventPrice: 0,
        eventPhoto: "",
        guideName: ""
    });


    useEffect(() => {
        let editedEvent = events.find(event => event._id === props.match.params.id);
        let date = new Date(editedEvent.eventDate);
        setEditedEvent({...editedEvent, eventDate: date});
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>

            <div className="container-fluid justify-content-center">
                <div className="row order m-2 p-2 bg-success bg-opacity-75 align-items-center">
                    <div className="col">
                        <h3>Edit Event {editedEvent.eventName}</h3>
                        <button className="btn btn-warning m-1" onClick={() => {
                            if (editedEvent.eventDate &&
                                editedEvent.eventDuration &&
                                editedEvent.eventName &&
                                editedEvent.eventShortDescription &&
                                editedEvent.eventFullDescription &&
                                editedEvent.eventMeetingPoint &&
                                editedEvent.eventAdditionalInfo &&
                                editedEvent.eventDifficulty &&
                                editedEvent.eventCapacity &&
                                editedEvent.eventPrice &&
                                editedEvent.eventPhoto &&
                                editedEvent.guideName) {
                                dispatch(updateEvent(props.match.params.id, editedEvent))
                                history.push("/admin");
                            } else {
                                console.log("не заполнены поля")
                            }

                        }}>Сохранить
                        </button>
                        <button className="btn btn-warning m-1" onClick={() => history.push("/admin")}>К списку экскурсий</button>
                    </div>
                </div>
            </div>

            <div className="container justify-content-center">
                <div className="row justify-content-center m-1 m-1">
                    <div className="col-2">
                        <label htmlFor="eventDate">Выберите дату:</label>
                    </div>
                    <div className="col-4">
                        <DatePicker
                            className="form-control"
                            selected={editedEvent.eventDate}
                            onChange={(date) => setEditedEvent({...editedEvent, eventDate: date})}
                            showTimeSelect
                            id="eventDate"
                        />
                    </div>
                </div>
                <div className="row justify-content-center m-1">
                    <div className="col-2">
                        <label htmlFor="eventName">Название:</label>
                    </div>
                    <div className="col-4 ">
                        <input type="text" value={editedEvent.eventName} id="eventName" className="w-100 form-control"
                               onChange={(e) => setEditedEvent({...editedEvent, eventName: e.target.value})}/>
                    </div>
                </div>
                <div className="row justify-content-center m-1">
                    <div className="col-2">
                        <label htmlFor="eventShortDescription">Короткое описание:</label>
                    </div>
                    <div className="col-4">
                        <textarea className="w-100 form-control" rows="3"  value={editedEvent.eventShortDescription} id="eventShortDescription"
                                  onChange={(e) => setEditedEvent({
                                      ...editedEvent,
                                      eventShortDescription: e.target.value
                                  })}/>
                    </div>
                </div>
                <div className="row justify-content-center m-1">
                    <div className="col-2">
                        <label htmlFor="eventFullDescription">Полное описание:</label>
                    </div>
                    <div className="col-4">
                        <textarea className="form-control" rows="6" value={editedEvent.eventFullDescription} id="eventFullDescription"
                                  onChange={(e) => setEditedEvent({...editedEvent, eventFullDescription: e.target.value})}/>
                    </div>
                </div>
                <div className="row justify-content-center m-1">
                    <div className="col-2">
                        <label htmlFor="eventMeetingPoint">Где встречаемся:</label>
                    </div>
                    <div className="col-4">
                        <input className="form-control" type="text" value={editedEvent.eventMeetingPoint} id="eventMeetingPoint"
                               onChange={(e) => setEditedEvent({...editedEvent, eventMeetingPoint: e.target.value})}/>
                    </div>
                </div>
                <div className="row justify-content-center m-1">
                    <div className="col-2">
                        <label htmlFor="eventAdditionalInfo">Дополнительно:</label>
                    </div>
                    <div className="col-4">
                        <input className="form-control" type="text" value={editedEvent.eventAdditionalInfo} id="eventAdditionalInfo"
                               onChange={(e) => setEditedEvent({...editedEvent, eventAdditionalInfo: e.target.value})}/>
                    </div>
                </div>
                <div className="row justify-content-center m-1">
                    <div className="col-2">
                        <label htmlFor="eventCity">Город:</label>
                    </div>
                    <div className="col-4">
                        <input className="form-control" type="text" value={editedEvent.eventCity} id="eventCity"
                               onChange={(e) => setEditedEvent({...editedEvent, eventCity: e.target.value})}/>
                    </div>
                </div>
                <div className="row justify-content-center m-1">
                    <div className="col-2">
                        <label htmlFor="eventDifficulty">Сложность:</label>
                    </div>
                    <div className="col-4">
                        <select className="form-select" id="eventDifficulty"
                                onChange={(e) => setEditedEvent({...editedEvent, eventDifficulty: e.target.value})}>
                            <option>Турист (обзорная)</option>
                            <option>Местный (тематическая)</option>
                            <option>Сам гидом могу</option>
                        </select>
                    </div>
                </div>
                <div className="row justify-content-center m-1">
                    <div className="col-2">
                        <label htmlFor="eventCapacity">Кол-во участников:</label>
                    </div>
                    <div className="col-4">
                        <input className="form-control" type="number" id="eventCapacity" min="1" max="100" value={editedEvent.eventCapacity}
                               onChange={(e) => setEditedEvent({...editedEvent, eventCapacity: e.target.value})}/>
                    </div>
                </div>
                <div className="row justify-content-center m-1">
                    <div className="col-2">
                        <label htmlFor="eventPrice">Стоимость:</label>
                    </div>
                    <div className="col-4">
                        <input className="form-control" type="number" id="eventPrice" min="1" max="10000" value={editedEvent.eventPrice}
                               onChange={(e) => setEditedEvent({...editedEvent, eventPrice: e.target.value})}/>

                    </div>
                </div>
                <div className="row justify-content-center m-1">
                    <div className="col-2">
                        <label htmlFor="eventDuration">Продолжительность (часов):</label>
                    </div>
                    <div className="col-4">
                        <input type="number" id="eventDuration" min="1" max="100" step="0,5" value={editedEvent.eventDuration} className="form-control"
                               onChange={(e) => setEditedEvent({...editedEvent, eventDuration: e.target.value})}/>
                    </div>
                </div>
                <div className="row justify-content-center m-1">
                    <div className="col-2">
                        <label htmlFor="guideName">Гид:</label>
                    </div>
                    <div className="col-4">
                        <select
                            className="form-select"
                            onChange={(e) => {
                                setEditedEvent({...editedEvent, guideName: e.target.value})
                            }}>
                            {guides.map((guide) => {
                                return <option key={guide._id} value={guide.guideName}>{guide.guideName}</option>
                            })}
                        </select>
                    </div>
                </div>
                <div className="row justify-content-center m-1">
                    <div className="col-2">
                        <label htmlFor="eventPhoto">Загрузка фото:</label>
                    </div>
                    <div className="col-4">
                        <FileBase64
                            className="form-control"
                            multiple={false}
                            type="file"
                            onDone={({base64}) => setEditedEvent({...editedEvent, eventPhoto: base64})}/>
                    </div>
                </div>
                <div className="row justify-content-center m-1">
                    <div className="col-2">
                        <img src={editedEvent.eventPhoto} alt="Фото экскурсии"/>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditEvent;