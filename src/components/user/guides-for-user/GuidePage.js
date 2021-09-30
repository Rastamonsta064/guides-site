import React from 'react';
import {useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import GuideEventsList from "./GuideEventsList";

const GuidePage = (props) => {

    const history = useHistory();

    const guide = useSelector(state => state.guides.find(guide => guide._id === props.match.params.id));
    const events = useSelector(state => state.events.filter(event => event.guideName === guide.guideName));


    return (
        <>
            <div className="container-fluid justify-content-center">
                <div className="row order m-2 p-2 bg-success bg-opacity-75 align-items-center">
                    <div className="col">
                        <h1>Информациия о <span className="text-warning">Гиде</span></h1>
                        <button className="btn btn-warning m-1" onClick={() => history.push("/")}>На Главную</button>
                    </div>
                </div>
            </div>
            <div className="container justify-content-center">
                <div className="row m-2 p-2 align-items-center">
                    <div className="col text-center">
                        {guide ? <h1>Имя Гида: {guide.guideName}</h1> : <p>не работает</p>}
                        {guide ? <h2>Кто этот гид: {guide.guideDescription}</h2> : <p>не работает</p>}
                        {guide ? <h2>Контактная инфа: {guide.guideContact}</h2> : <p>не работает</p>}
                        {guide ? <img src={guide.guidePhoto} alt={"QR"}/> : <p>не работает</p>}
                        {guide ? <h2>ID Гида: {guide._id}</h2> : <p>не работает</p>}
                    </div>
                </div>
            </div>
            <GuideEventsList events={events} />
        </>
    );
}

export default GuidePage;