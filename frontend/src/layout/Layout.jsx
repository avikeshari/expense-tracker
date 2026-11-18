import { useState } from "react";
import { Outlet } from "react-router-dom";

import Navbar from "./header/Navbar.jsx";
import Sidebar from "./sidebar/Sidebar.jsx";

function Layout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleMenuToggle = () => {
        setIsSidebarOpen((previousState) => !previousState);
    };

    const handleSidebarClose = () => {
        setIsSidebarOpen(false);
    };

    return (
        <div className="app-layout">
            <Sidebar
                isOpen={isSidebarOpen}
                onClose={handleSidebarClose}
            />

            <div className="app-main">
                <Navbar onMenuClick={handleMenuToggle} />

                <main className="main-content">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default Layout;