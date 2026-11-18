import { Inbox } from "lucide-react";

function EmptyState({
    icon: Icon = Inbox,
    title = "No data found",
    description = "There's nothing to display here yet.",
    action,
}) {
    return (
        <div className="empty-state">
            <div className="empty-state-icon">
                <Icon size={32} />
            </div>

            <h3 className="empty-state-title">
                {title}
            </h3>

            <p className="empty-state-description">
                {description}
            </p>

            {action && (
                <div className="empty-state-action">
                    {action}
                </div>
            )}
        </div>
    );
}

export default EmptyState;