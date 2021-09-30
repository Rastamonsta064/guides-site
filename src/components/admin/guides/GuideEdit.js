import React, {useEffect, useState} from 'react';
import FileBase64 from "react-file-base64";
import {useDispatch, useSelector} from "react-redux";
import {updateGuide} from "../../../redux/actions";
import {useHistory} from "react-router";


const GuideEdit = (props) => {

    const [newGuide, setNewGuide] = useState({guideName: "loading...", guideDescription: "...", guideContact: "...", guidePhoto: ""});
    const guides = useSelector(state => state.guides);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        let editedGuide = guides.find(guide => guide._id === props.match.params.id);
        setNewGuide(editedGuide);
    },[]); // eslint-disable-line react-hooks/exhaustive-deps

    const updateGuideHandler = (newGuide) => {
        if (newGuide.guideName && newGuide.guideDescription && newGuide.guideContact && newGuide.guidePhoto) {
            dispatch(updateGuide(props.match.params.id, newGuide));
            history.push("/admin");
        }
    }

    return (
        <>
            <div className="container-fluid justify-content-center">
                <div className="row order m-2 p-2 bg-success bg-opacity-75 align-items-center">
                    <div className="col">
                        <h1>Изменение информации <span className="text-warning">гида</span></h1>
                        <button className="btn btn-warning m-1" onClick={() => updateGuideHandler(newGuide)}>Сохранить</button>
                        <button className="btn btn-warning m-1" onClick={() => history.push("/admin")}>Отмена</button>
                    </div>
                </div>
            </div>

            <div className="container justify-content-center">
                <div className="row justify-content-center m-1 m-1">
                    <div className="col-2">
                        <label htmlFor="guideName">Имя:</label>
                    </div>
                    <div className="col-4">
                        <input className="form-control w-100" type="text" value={newGuide.guideName} id="guideName"
                               onChange={(e) => setNewGuide({...newGuide, guideName: e.target.value})}/>
                    </div>
                </div>
                <div className="row justify-content-center m-1 m-1">
                    <div className="col-2">
                        <label htmlFor="guideDescription">Кто такой этот гид:</label>
                    </div>
                    <div className="col-4">
                        <textarea className="form-control w-100" rows="3" value={newGuide.guideDescription} id="guideDescription"
                                  onChange={(e) => setNewGuide({...newGuide, guideDescription: e.target.value})}/>
                    </div>
                </div>
                <div className="row justify-content-center m-1 m-1">
                    <div className="col-2">
                        <label htmlFor="guideContact">Контактный номер телефона:</label>
                    </div>
                    <div className="col-4">
                        <input className="form-control w-100" type="text" value={newGuide.guideContact} id="guideContact"
                               onChange={(e) => setNewGuide({...newGuide, guideContact: e.target.value})}/>
                    </div>
                </div>
                <div className="row justify-content-center m-1 m-1">
                    <div className="col-2">
                        <label htmlFor="guidePhoto">Загрузка фото:</label>
                    </div>
                    <div className="col-4">
                        <FileBase64 multiple={false}
                                    type="file"
                                    onDone={({base64}) => setNewGuide({...newGuide, guidePhoto: base64})}/>
                    </div>
                </div>
                <div className="row justify-content-center m-1 m-1">
                    <div className="col-auto">
                        {newGuide.guidePhoto ?  <img src={newGuide.guidePhoto} alt="Фото гида"/> : <h1><i className="bi bi-person-square"></i></h1> }
                    </div>

                </div>
            </div>
        </>
    );
};

export default GuideEdit;