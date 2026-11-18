import {
    Wallet,
    TrendingDown,
    TrendingUp,
    PiggyBank,
} from "lucide-react";

import { formatCurrency } from "../../utils/formatCurrency";

function BudgetSummary({
    budgetAmount,
    totalSpent,
    remainingAmount,
    percentageSpent,
}) {
    const isOverBudget = remainingAmount < 0;

    const cards = [
        {
            label: "Monthly Budget",
            value: formatCurrency(budgetAmount),
            icon: PiggyBank,
            color: "blue",
        },
        {
            label: "Total Spent",
            value: formatCurrency(totalSpent),
            icon: TrendingDown,
            color: "orange",
        },
        {
            label: "Remaining",
            value: formatCurrency(Math.abs(remainingAmount)),
            icon: isOverBudget ? TrendingUp : Wallet,
            color: isOverBudget ? "red" : "green",
            description: isOverBudget ? "Over budget" : "Available",
        },
        {
            label: "Budget Used",
            value: `${percentageSpent.toFixed(1)}%`,
            icon: TrendingUp,
            color: "purple",
        },
    ];

    return (
        <div className="budget-summary-grid">
            {cards.map((card) => {
                const Icon = card.icon;

                return (
                    <div
                        className="budget-summary-card"
                        key={card.label}
                    >
                        <div className={`budget-summary-icon ${card.color}`}>
                            <Icon size={22} />
                        </div>

                        <div className="budget-summary-content">
                            <p>{card.label}</p>

                            <h3>{card.value}</h3>

                            {card.description && (
                                <span>{card.description}</span>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default BudgetSummary;