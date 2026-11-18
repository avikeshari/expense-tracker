import { Routes, Route } from "react-router-dom";

import Layout from "../layout/Layout.jsx";

import Dashboard from "../Pages/Dashboard.jsx";
import Expenses from "../Pages/Expenses.jsx";
import Budget from "../Pages/Budget.jsx";
import NotFound from "../Pages/NotFound.jsx";

const AppRoutes = () => {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/expenses" element={<Expenses />} />
                <Route path="/budget" element={<Budget />} />
            </Route>

            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default AppRoutes;