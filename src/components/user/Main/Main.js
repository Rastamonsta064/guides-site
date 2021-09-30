import React, {useState} from 'react';
import MainEventsList from "./MainEventsList";
import MainHeader from "./MainHeader";
import {useSelector} from "react-redux";

const Main = () => {

    const events = useSelector(state => state.events);

    const [guide,setGuide] = useState("all");
    const [allAndFuture,setAllAndFuture] = useState("all"); //true - all, false - future
    const [city,setCity] = useState("all");
    const [level,setLevel] = useState("all");

    return (
        <>
            <MainHeader setGuide={setGuide} />
            <MainEventsList guide={guide} events={guide === "all" ? events : events.filter(event=> event.guideName === guide)}/>
        </>
    );
}

export default Main;