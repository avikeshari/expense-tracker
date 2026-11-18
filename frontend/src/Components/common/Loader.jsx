import { Loader2 } from "lucide-react";

function Loader({
    size = 32,
    message = "Loading...",
    fullScreen = false,
}) {
    return (
        <div
            className={`loader-container ${fullScreen ? "loader-fullscreen" : ""
                }`}
        >
            <Loader2
                size={size}
                className="loader-spinner"
            />

            {message && (
                <p className="loader-message">{message}</p>
            )}
        </div>
    );
}

export default Loader;