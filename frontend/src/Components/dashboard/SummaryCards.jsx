import {
    Wallet,
    TrendingDown,
    PiggyBank,
    Receipt,
} from "lucide-react";

const SummaryCards = ({
    monthlyExpenses,
    monthlyBudget,
    remainingBudget,
    transactionCount,
}) => {
    const cards = [
        {
            title: "Monthly Expenses",
            value: monthlyExpenses,
            icon: TrendingDown,
            color: "red",
        },
        {
            title: "Monthly Budget",
            value: monthlyBudget,
            icon: Wallet,
            color: "blue",
        },
        {
            title: "Remaining Budget",
            value: remainingBudget,
            icon: PiggyBank,
            color: remainingBudget < 0 ? "red" : "green",
        },
        {
            title: "Transactions",
            value: transactionCount,
            icon: Receipt,
            color: "purple",
            isCount: true,
        },
    ];

    const formatCurrency = (value) =>
        new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
        }).format(value || 0);

    return (
        <div className="dashboard-summary-grid">
            {cards.map((card) => {
                const Icon = card.icon;

                return (
                    <div className="dashboard-summary-card" key={card.title}>
                        <div className="dashboard-summary-top">
                            <div className={`dashboard-summary-icon ${card.color}`}>
                                <Icon size={20} />
                            </div>

                            <span className="dashboard-summary-label">
                                {card.title}
                            </span>
                        </div>

                        <h3 className="dashboard-summary-value">
                            {card.isCount
                                ? card.value
                                : formatCurrency(card.value)}
                        </h3>
                    </div>
                );
            })}
        </div>
    );
};

export default SummaryCards;