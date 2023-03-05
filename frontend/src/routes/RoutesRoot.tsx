import { Route, Routes  } from 'react-router-dom';

import React from "react";
import HomePage from '../pages/HomePage';
import ProfilePage from "../pages/ProfilePage";
import ConfigPage from "../pages/ConfigPage";
import NotificationsPage from "../pages/NotificationsPage";
import MessagesPage from "../pages/MessagesPage";
import IncomesPage from '../pages/IncomesPage';
import CurrenciesPage from '../pages/CurrenciesPage';
import CountriesPage from '../pages/CountriesPage';
import TransactionsPage from '../pages/TransactionsPage';
import PeoplePage from '../pages/PeoplePage';

function RoutesRoot() {
  return (
    <Routes>
        <Route path="" element={<HomePage />} />
        <Route path="incomes/*" element={<IncomesPage />} />
        <Route path="currencies/*" element={<CurrenciesPage />} />
        <Route path="countries/*" element={<CountriesPage />} />
        <Route path="transactions/*" element={<TransactionsPage />} />
        <Route path="person/:id/transactions/*" element={<TransactionsPage />} />
        <Route path="person/*" element={<PeoplePage />} />
        <Route path="messages" element={<MessagesPage />} />
        <Route path="notifications" element={<NotificationsPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="config" element={<ConfigPage />} />
    </Routes>
  );
}

export default RoutesRoot;
