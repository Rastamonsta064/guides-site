import {HashRouter, Switch, Route} from "react-router-dom";
import {useDispatch} from "react-redux";
import {getEvents, getGuides, getOrders} from "./redux/actions";
import React, {useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Main from "./components/user/Main/Main";
import CreateEvent from "./components/admin/events/CreateEvent";
import EditEvent from "./components/admin/events/EditEvent";
import GuideCreate from "./components/admin/guides/GuideCreate";
import GuideEdit from "./components/admin/guides/GuideEdit";
import ClientHook from "./components/user/client-hook/ClientHook";
import AdminPanel from "./components/admin/AdminPanel";
import OrderPage from "./components/admin/orders/OrderPage";
import OrderCreate from "./components/admin/orders/order-create/OrderCreate";
import GuidePage from "./components/user/guides-for-user/GuidePage";

function App() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getEvents());
        dispatch(getGuides());
        dispatch(getOrders());
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <HashRouter>
            <Switch>
                <Route path="/" exact component={Main}/>
                <Route path="/event/:id" component={ClientHook}/>
                <Route path="/create_event/" component={CreateEvent}/>
                <Route path="/edit_event/:id" component={EditEvent}/>
                <Route path="/guides/:id" component={GuidePage}/>
                <Route path="/create_guide" component={GuideCreate}/>
                <Route path="/edit_guide/:id" component={GuideEdit}/>
                <Route path="/orders/:id" component={OrderPage}/>
                <Route path="/create_order/" component={OrderCreate}/>
                <Route path="/admin" component={AdminPanel}/>
                <Route path="*" component={() => <h2 className="text-center">404 NOT FOUND</h2>}/>
            </Switch>
                <p className="m-1 text-center"> Guides Site. Made by Mikhail Lapshin. ©All rights reserved 2021</p>
        </HashRouter>
    );
}

export default App;
