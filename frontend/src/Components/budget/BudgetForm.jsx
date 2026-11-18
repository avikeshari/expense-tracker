import { useEffect, useState } from "react";

import Button from "../common/Button";

function BudgetForm({
    initialData = null,
    month,
    year,
    onSubmit,
    onCancel,
    loading = false,
}) {
    const [amount, setAmount] = useState("");
    const [formError, setFormError] = useState("");

    useEffect(() => {
        setAmount(initialData?.amount ?? "");
    }, [initialData]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const numericAmount = Number(amount);

        if (!numericAmount || numericAmount <= 0) {
            setFormError("Enter a valid budget amount.");
            return;
        }

        const budgetData = {
            amount: numericAmount,
            month,
            year,
        };

        const result = await onSubmit(budgetData);

        if (!result?.success) {
            setFormError(
                result?.message || "Failed to save budget."
            );
        }
    };

    return (
        <form
            className="budget-form"
            onSubmit={handleSubmit}
        >
            <div className="form-group">
                <label htmlFor="budget-amount">
                    Monthly Budget (₹)
                </label>

                <input
                    id="budget-amount"
                    type="number"
                    min="0.01"
                    step="0.01"
                    placeholder="Enter your monthly budget"
                    value={amount}
                    onChange={(event) => {
                        setAmount(event.target.value);
                        setFormError("");
                    }}
                    required
                />
            </div>

            <div className="budget-period-display">
                Budget period: <strong>{month}/{year}</strong>
            </div>

            {formError && (
                <p className="form-error">
                    {formError}
                </p>
            )}

            <div className="form-actions">
                <Button
                    variant="secondary"
                    onClick={onCancel}
                    disabled={loading}
                >
                    Cancel
                </Button>

                <Button
                    type="submit"
                    loading={loading}
                >
                    {initialData ? "Update Budget" : "Set Budget"}
                </Button>
            </div>
        </form>
    );
}

export default BudgetForm;