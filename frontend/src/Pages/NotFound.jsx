import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="page-container">
            <h1 className="page-title">404 - Page Not Found</h1>

            <p className="page-description">
                The page you're looking for doesn't exist.
            </p>

            <Link to="/">Return to Dashboard</Link>
        </div>
    );
}

export default NotFound;