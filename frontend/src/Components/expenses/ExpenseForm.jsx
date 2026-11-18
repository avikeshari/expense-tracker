import { useEffect, useState } from "react";

import { EXPENSE_CATEGORIES } from "../../data/categories";
import { formatDateForInput } from "../../utils/formatDate";

import Button from "../common/Button";

function ExpenseForm({
    initialData = null,
    onSubmit,
    onCancel,
    loading = false,
}) {
    const [formData, setFormData] = useState({
        amount: "",
        category: "Food",
        date: formatDateForInput(),
        description: "",
    });

    const [formError, setFormError] = useState("");

    useEffect(() => {
        if (initialData) {
            setFormData({
                amount: initialData.amount ?? "",
                category: initialData.category ?? "Food",
                date: initialData.date
                    ? formatDateForInput(new Date(initialData.date))
                    : formatDateForInput(),
                description: initialData.description ?? "",
            });
        } else {
            setFormData({
                amount: "",
                category: "Food",
                date: formatDateForInput(),
                description: "",
            });
        }
    }, [initialData]);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((previousData) => ({
            ...previousData,
            [name]: value,
        }));

        setFormError("");
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const amount = Number(formData.amount);

        if (!amount || amount <= 0) {
            setFormError("Enter a valid amount greater than zero.");
            return;
        }

        if (!formData.category) {
            setFormError("Please select a category.");
            return;
        }

        const expenseData = {
            amount,
            category: formData.category,
            date: formData.date,
            description: formData.description.trim(),
        };

        const result = await onSubmit(expenseData);

        if (result?.success) {
            if (!initialData) {
                setFormData({
                    amount: "",
                    category: "Food",
                    date: formatDateForInput(),
                    description: "",
                });
            }
        } else {
            setFormError(result?.message || "Something went wrong.");
        }
    };

    return (
        <form
            className="expense-form"
            onSubmit={handleSubmit}
        >
            <div className="form-group">
                <label htmlFor="amount">
                    Amount (₹)
                </label>

                <input
                    id="amount"
                    name="amount"
                    type="number"
                    min="0.01"
                    step="0.01"
                    placeholder="Enter amount"
                    value={formData.amount}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="category">
                    Category
                </label>

                <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                >
                    {EXPENSE_CATEGORIES.map((category) => (
                        <option
                            key={category.name}
                            value={category.name}
                        >
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="date">
                    Date
                </label>

                <input
                    id="date"
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="description">
                    Description
                </label>

                <textarea
                    id="description"
                    name="description"
                    rows="3"
                    maxLength="200"
                    placeholder="What was this expense for?"
                    value={formData.description}
                    onChange={handleChange}
                />
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
                    {initialData ? "Update Expense" : "Add Expense"}
                </Button>
            </div>
        </form>
    );
}

export default ExpenseForm;