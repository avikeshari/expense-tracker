import {
    Menu,
    Bell,
    Wallet,
} from "lucide-react";

function Navbar({ onMenuClick }) {
    return (
        <header className="navbar">
            <div className="navbar-left">
                <button
                    className="navbar-menu-btn"
                    onClick={onMenuClick}
                    aria-label="Toggle navigation menu"
                >
                    <Menu size={22} />
                </button>

                <div className="navbar-brand-mobile">
                    <Wallet size={22} />
                    <span>Expense Tracker</span>
                </div>
            </div>

            <div className="navbar-right">
                <button
                    className="navbar-icon-btn"
                    aria-label="Notifications"
                >
                    <Bell size={20} />
                </button>

                <div className="navbar-profile">
                    <div className="profile-avatar">
                        A
                    </div>

                    <div className="profile-info">
                        <span className="profile-name">
                            User
                        </span>

                        <span className="profile-role">
                            Personal Account
                        </span>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Navbar;