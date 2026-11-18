import { NavLink } from "react-router-dom";
import {
    LayoutDashboard,
    Wallet,
    PiggyBank,
    Receipt,
    X,
} from "lucide-react";

import { NAVIGATION_ITEMS } from "../../data/navigation";

const ICONS = {
    LayoutDashboard,
    Wallet,
    PiggyBank,
    Receipt,
};

function Sidebar({ isOpen, onClose }) {
    return (
        <>
            {/* Mobile backdrop */}
            {isOpen && (
                <div
                    className="sidebar-backdrop"
                    onClick={onClose}
                />
            )}

            <aside
                className={`sidebar ${isOpen ? "sidebar-open" : ""
                    }`}
            >
                <div className="sidebar-header">
                    <div className="sidebar-brand">
                        <div className="sidebar-brand-icon">
                            <Wallet size={22} />
                        </div>

                        <div>
                            <h2>Expense Tracker</h2>
                            <span>Personal Finance</span>
                        </div>
                    </div>

                    <button
                        className="sidebar-close-btn"
                        onClick={onClose}
                        aria-label="Close sidebar"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="sidebar-section">
                    <p className="sidebar-section-label">
                        MENU
                    </p>

                    <nav className="sidebar-navigation">
                        {NAVIGATION_ITEMS.map((item) => {
                            const Icon = ICONS[item.icon];

                            return (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    end={item.path === "/"}
                                    className={({ isActive }) =>
                                        `sidebar-link ${isActive ? "sidebar-link-active" : ""
                                        }`
                                    }
                                    onClick={onClose}
                                >
                                    {Icon && <Icon size={20} />}

                                    <span>{item.label}</span>
                                </NavLink>
                            );
                        })}
                    </nav>
                </div>

                <div className="sidebar-footer">
                    <div className="sidebar-footer-card">
                        <div className="sidebar-footer-icon">
                            <Wallet size={20} />
                        </div>

                        <div>
                            <p>Stay on track</p>
                            <span>
                                Keep monitoring your spending.
                            </span>
                        </div>
                    </div>

                    <p className="sidebar-version">
                        Expense Tracker v1.0
                    </p>
                </div>
            </aside>
        </>
    );
}

export default Sidebar;