import React, {useState} from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import FileBase64 from "react-file-base64";
import {useDispatch, useSelector} from "react-redux";
import {createEvent} from "../../../redux/actions";
import {useHistory} from "react-router";


const CreateEvent = () => {

    const guides = useSelector(state => state.guides);

    const dispatch = useDispatch();

    const history = useHistory();

    const [newEvent, setNewEvent] = useState({
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


    return (
        <>
            <div className="container-fluid justify-content-center">
                <div className="row order m-2 p-2 bg-success bg-opacity-75 align-items-center">
                    <div className="col">
                        <h1>Guides site Admin Panel</h1>
                        <button className="btn btn-warning m-1" onClick={() => {
                            if (newEvent.eventDate && newEvent.eventDuration && newEvent.eventName && newEvent.eventShortDescription &&
                                newEvent.eventFullDescription &&
                                newEvent.eventMeetingPoint &&
                                newEvent.eventAdditionalInfo &&
                                newEvent.eventDifficulty &&
                                newEvent.eventCapacity &&
                                newEvent.eventPrice &&
                                newEvent.eventPhoto &&
                                newEvent.guideName) {
                                dispatch(createEvent(newEvent))
                                history.push("/admin");
                            } else {
                                console.log("не заполнены поля")
                            }

                        }}>Опубликовать
                        </button>
                        <button className="btn btn-warning m-1" onClick={() => history.push("/admin")}>К списку
                            экскурсий
                        </button>
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
                            selected={newEvent.eventDate}
                            onChange={(date) => setNewEvent({...newEvent, eventDate: date})}
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
                        <input className="w-100 form-control" type="text" value={newEvent.eventName} id="eventName"
                               onChange={(e) => setNewEvent({...newEvent, eventName: e.target.value})}/>
                    </div>
                </div>
                <div className="row justify-content-center m-1">
                    <div className="col-2">
                        <label htmlFor="eventShortDescription">Короткое описание:</label>
                    </div>
                    <div className="col-4">
                        <textarea className="w-100 form-control" rows="3"  value={newEvent.eventShortDescription} id="eventShortDescription"
                               onChange={(e) => setNewEvent({...newEvent, eventShortDescription: e.target.value})}/>
                    </div>
                </div>
                <div className="row justify-content-center m-1">
                    <div className="col-2">
                        <label htmlFor="eventFullDescription">Полное описание:</label>
                    </div>
                    <div className="col-4">
                        <textarea className="form-control" rows="6" value={newEvent.eventFullDescription} id="eventFullDescription"
                               onChange={(e) => setNewEvent({...newEvent, eventFullDescription: e.target.value})}/>
                    </div>
                </div>
                <div className="row justify-content-center m-1">
                    <div className="col-2">
                        <label htmlFor="eventMeetingPoint">Где встречаемся:</label>
                    </div>
                    <div className="col-4">
                        <input className="form-control" type="text" value={newEvent.eventMeetingPoint} id="eventMeetingPoint"
                               onChange={(e) => setNewEvent({...newEvent, eventMeetingPoint: e.target.value})}/>
                    </div>
                </div>
                <div className="row justify-content-center m-1">
                    <div className="col-2">
                        <label htmlFor="eventAdditionalInfo">Дополнительно:</label>
                    </div>
                    <div className="col-4">
                        <input className="form-control" type="text" value={newEvent.eventAdditionalInfo} id="eventAdditionalInfo"
                               onChange={(e) => setNewEvent({...newEvent, eventAdditionalInfo: e.target.value})}/>
                    </div>
                </div>
                <div className="row justify-content-center m-1">
                    <div className="col-2">
                        <label htmlFor="eventCity">Город:</label>
                    </div>
                    <div className="col-4">
                        <input className="form-control" type="text" value={newEvent.eventCity} id="eventCity"
                               onChange={(e) => setNewEvent({...newEvent, eventCity: e.target.value})}/>
                    </div>
                </div>
                <div className="row justify-content-center m-1">
                    <div className="col-2">
                        <label htmlFor="eventDifficulty">Сложность:</label>
                    </div>
                    <div className="col-4">
                        <select className="form-select" id="eventDifficulty"
                                onChange={(e) => setNewEvent({...newEvent, eventDifficulty: e.target.value})}>
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
                        <input className="form-control" type="number" id="eventCapacity" min="1" max="100"
                               onChange={(e) => setNewEvent({...newEvent, eventCapacity: e.target.value})}/>
                    </div>
                </div>
                <div className="row justify-content-center m-1">
                    <div className="col-2">
                        <label htmlFor="eventPrice">Стоимость:</label>
                    </div>
                    <div className="col-4">
                        <input className="form-control" type="number" id="eventPrice" min="1" max="10000"
                               onChange={(e) => setNewEvent({...newEvent, eventPrice: e.target.value})}/>

                    </div>
                </div>
                <div className="row justify-content-center m-1">
                    <div className="col-2">
                        <label htmlFor="eventDuration">Продолжительность (часов):</label>
                    </div>
                    <div className="col-4">
                        <input className="form-control" type="number" id="eventDuration" min="1" max="99" step="0,5"
                               onChange={(e) => setNewEvent({...newEvent, eventDuration: e.target.value})}/>
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
                                setNewEvent({...newEvent, guideName: e.target.value})
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
                                    onDone={({base64}) => setNewEvent({...newEvent, eventPhoto: base64})}/>
                    </div>
                </div>
                <div className="row justify-content-center m-1">
                    <div className="col-2">
                        <img src={newEvent.eventPhoto} alt="Фото экскурсии"/>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CreateEvent;