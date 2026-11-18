import {
    Utensils,
    Car,
    ShoppingBag,
    Receipt,
    HeartPulse,
    GraduationCap,
    Gamepad2,
    CircleEllipsis,
    Pencil,
    Trash2,
} from "lucide-react";

import { EXPENSE_CATEGORIES } from "../../data/categories";
import { formatCurrency } from "../../utils/formatCurrency";
import { formatDate } from "../../utils/formatDate";

const ICONS = {
    Utensils,
    Car,
    ShoppingBag,
    Receipt,
    HeartPulse,
    GraduationCap,
    Gamepad2,
    CircleEllipsis,
};

function ExpenseItem({
    expense,
    onEdit,
    onDelete,
}) {
    const category = EXPENSE_CATEGORIES.find(
        (item) => item.name === expense.category
    );

    const Icon = ICONS[category?.icon] || CircleEllipsis;

    return (
        <div className="expense-item">
            <div
                className="expense-category-icon"
                style={{
                    backgroundColor: `${category?.color || "#64748b"}15`,
                    color: category?.color || "#64748b",
                }}
            >
                <Icon size={20} />
            </div>

            <div className="expense-item-details">
                <h4>{expense.category}</h4>

                <p>
                    {expense.description || "No description"}
                </p>

                <span className="expense-item-date">
                    {formatDate(expense.date)}
                </span>
            </div>

            <div className="expense-item-right">
                <strong className="expense-item-amount">
                    -{formatCurrency(expense.amount)}
                </strong>

                <div className="expense-item-actions">
                    <button
                        type="button"
                        className="expense-action-btn edit"
                        onClick={() => onEdit(expense)}
                        aria-label="Edit expense"
                    >
                        <Pencil size={16} />
                    </button>

                    <button
                        type="button"
                        className="expense-action-btn delete"
                        onClick={() => onDelete(expense)}
                        aria-label="Delete expense"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ExpenseItem;