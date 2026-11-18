import {
    TrendingUp,
    Receipt,
    Calculator,
} from "lucide-react";

import { formatCurrency } from "../../utils/formatCurrency";

function ExpenseStats({ expenses }) {
    const total = expenses.reduce(
        (sum, expense) => sum + Number(expense.amount || 0),
        0
    );

    const count = expenses.length;

    const average = count > 0 ? total / count : 0;

    const stats = [
        {
            label: "Total Expenses",
            value: formatCurrency(total),
            icon: TrendingUp,
            color: "blue",
        },
        {
            label: "Transactions",
            value: count,
            icon: Receipt,
            color: "purple",
        },
        {
            label: "Average Expense",
            value: formatCurrency(average),
            icon: Calculator,
            color: "green",
        },
    ];

    return (
        <div className="expense-stats">
            {stats.map((stat) => {
                const Icon = stat.icon;

                return (
                    <div
                        key={stat.label}
                        className="expense-stat-card"
                    >
                        <div className={`expense-stat-icon ${stat.color}`}>
                            <Icon size={20} />
                        </div>

                        <div className="expense-stat-content">
                            <p>{stat.label}</p>

                            <h3>{stat.value}</h3>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default ExpenseStats;