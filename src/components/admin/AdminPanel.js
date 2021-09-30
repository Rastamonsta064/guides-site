import React from 'react';
import EventsList from "./events/EventsList";
import GuidesList from "./guides/GuidesList";
import OrdersList from "./orders/OrdersList";
import AdminPanelHeader from "./AdminPanelHeader";


const AdminPanel = () => {
    return (
        <>
            <AdminPanelHeader/>
                <EventsList/>
                <GuidesList/>
                <OrdersList/>

        </>
    );
};

export default AdminPanel;