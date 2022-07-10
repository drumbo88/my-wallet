import { Route, Routes  } from 'react-router-dom';

import React from "react";
import HomePage from '../pages/HomePage';
import ProfilePage from "../pages/ProfilePage";
import ConfigPage from "../pages/ConfigPage";
import NotificationsPage from "../pages/NotificationsPage";
import MessagesPage from "../pages/MessagesPage";
import IncomesPage from '../pages/IncomesPage';

function RoutesRoot() {
  return (
    <Routes>
        <Route path="" element={<HomePage />} />
        <Route path="incomes/*" element={<IncomesPage />} />
        <Route path="messages" element={<MessagesPage />} />
        <Route path="notifications" element={<NotificationsPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="config" element={<ConfigPage />} />
    </Routes>
  );
}

export default RoutesRoot;
