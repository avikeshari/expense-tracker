function BudgetProgress({
    budgetAmount,
    totalSpent,
    remainingAmount,
    percentageSpent,
}) {
    const isOverBudget = totalSpent > budgetAmount;

    const progressWidth = Math.min(
        percentageSpent,
        100
    );

    let progressColor = "normal";

    if (percentageSpent >= 90) {
        progressColor = "danger";
    } else if (percentageSpent >= 75) {
        progressColor = "warning";
    }

    if (isOverBudget) {
        progressColor = "danger";
    }

    return (
        <div className="budget-progress-card">
            <div className="budget-progress-header">
                <div>
                    <h3>Budget Usage</h3>

                    <p>
                        {isOverBudget
                            ? "You've exceeded your budget."
                            : "Monitor your spending throughout the month."}
                    </p>
                </div>

                <strong
                    className={`budget-percentage ${isOverBudget ? "over-budget" : ""
                        }`}
                >
                    {percentageSpent.toFixed(1)}%
                </strong>
            </div>

            <div className="budget-progress-track">
                <div
                    className={`budget-progress-fill ${progressColor}`}
                    style={{
                        width: `${progressWidth}%`,
                    }}
                />
            </div>

            <div className="budget-progress-labels">
                <span>
                    ₹{totalSpent.toLocaleString("en-IN")} spent
                </span>

                <span>
                    ₹{budgetAmount.toLocaleString("en-IN")} budget
                </span>
            </div>

            <div
                className={`budget-remaining-message ${isOverBudget ? "over-budget" : ""
                    }`}
            >
                {isOverBudget
                    ? `You've exceeded your budget by ₹${Math.abs(
                        remainingAmount
                    ).toLocaleString("en-IN")}`
                    : `₹${remainingAmount.toLocaleString(
                        "en-IN"
                    )} remaining`}
            </div>
        </div>
    );
}

export default BudgetProgress;