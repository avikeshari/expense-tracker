import { Loader2 } from "lucide-react";

function Button({
    children,
    variant = "primary",
    size = "medium",
    type = "button",
    disabled = false,
    loading = false,
    icon: Icon,
    className = "",
    onClick,
}) {
    const variantClasses = {
        primary: "btn-primary",
        secondary: "btn-secondary",
        danger: "btn-danger",
        ghost: "btn-ghost",
    };

    const sizeClasses = {
        small: "btn-sm",
        medium: "btn-md",
        large: "btn-lg",
    };

    return (
        <button
            type={type}
            className={`btn ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
            disabled={disabled || loading}
            onClick={onClick}
        >
            {loading ? (
                <Loader2 size={18} className="btn-spinner" />
            ) : (
                Icon && <Icon size={18} />
            )}

            {children}
        </button>
    );
}

export default Button;