import { useState } from "react";
import {
    CalendarDays,
    Plus,
    Pencil,
    Trash2,
    PiggyBank,
} from "lucide-react";

import toast from "react-hot-toast";

import useBudget from "../hooks/useBudget";

import Button from "../Components/common/Button";
import Loader from "../Components/common/Loader";
import EmptyState from "../Components/common/EmptyState";
import Modal from "../Components/common/Modal";

import BudgetForm from "../Components/budget/BudgetForm";
import BudgetSummary from "../Components/budget/BudgetSummary";
import BudgetProgress from "../Components/budget/BudgetProgress";

const MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

function Budget() {
    const currentDate = new Date();

    const [selectedMonth, setSelectedMonth] = useState(
        currentDate.getMonth() + 1
    );

    const [selectedYear, setSelectedYear] = useState(
        currentDate.getFullYear()
    );

    const {
        budget,
        monthlyExpenses,
        totalSpent,
        budgetAmount,
        remainingAmount,
        percentageSpent,
        loading,
        submitting,
        error,
        createBudget,
        updateBudget,
        removeBudget,
    } = useBudget(selectedMonth, selectedYear);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleBudgetSubmit = async (budgetData) => {
        let result;

        if (budget) {
            result = await updateBudget(
                budget._id,
                budgetData
            );

            if (result.success) {
                toast.success("Budget updated successfully");
            }
        } else {
            result = await createBudget(budgetData);

            if (result.success) {
                toast.success("Budget created successfully");
            }
        }

        if (result.success) {
            closeModal();
        }

        return result;
    };

    const handleDeleteBudget = async () => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this budget?"
        );

        if (!confirmed) return;

        const result = await removeBudget(budget._id);

        if (result.success) {
            toast.success("Budget deleted successfully");
        } else {
            toast.error(result.message);
        }
    };

    const years = Array.from(
        { length: 7 },
        (_, index) => currentDate.getFullYear() - 3 + index
    );

    if (loading) {
        return (
            <Loader
                fullScreen
                message="Loading budget..."
            />
        );
    }

    return (
        <div className="page-container budget-page">
            {/* Header */}
            <div className="page-header">
                <div>
                    <h1 className="page-title">
                        Budget
                    </h1>

                    <p className="page-description">
                        Plan your spending and monitor your monthly budget.
                    </p>
                </div>

                {budget && (
                    <div className="budget-header-actions">
                        <Button
                            variant="secondary"
                            icon={Pencil}
                            onClick={() => setIsModalOpen(true)}
                        >
                            Edit Budget
                        </Button>

                        <Button
                            variant="danger"
                            icon={Trash2}
                            onClick={handleDeleteBudget}
                        >
                            Delete
                        </Button>
                    </div>
                )}
            </div>

            {/* Period Selector */}
            <div className="budget-period-selector">
                <div className="budget-period-label">
                    <CalendarDays size={20} />

                    <span>Select Period</span>
                </div>

                <div className="budget-period-controls">
                    <select
                        value={selectedMonth}
                        onChange={(event) =>
                            setSelectedMonth(Number(event.target.value))
                        }
                    >
                        {MONTHS.map((month, index) => (
                            <option
                                key={month}
                                value={index + 1}
                            >
                                {month}
                            </option>
                        ))}
                    </select>

                    <select
                        value={selectedYear}
                        onChange={(event) =>
                            setSelectedYear(Number(event.target.value))
                        }
                    >
                        {years.map((year) => (
                            <option
                                key={year}
                                value={year}
                            >
                                {year}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Error */}
            {error && (
                <div className="expense-error">
                    {error}
                </div>
            )}

            {/* No Budget */}
            {!budget && (
                <div className="budget-empty-container">
                    <EmptyState
                        icon={PiggyBank}
                        title={`No budget for ${MONTHS[selectedMonth - 1]} ${selectedYear}`}
                        description="Set a monthly budget to track your expenses and manage your spending."
                        action={
                            <Button
                                icon={Plus}
                                onClick={() => setIsModalOpen(true)}
                            >
                                Set Monthly Budget
                            </Button>
                        }
                    />
                </div>
            )}

            {/* Budget Data */}
            {budget && (
                <>
                    <BudgetSummary
                        budgetAmount={budgetAmount}
                        totalSpent={totalSpent}
                        remainingAmount={remainingAmount}
                        percentageSpent={percentageSpent}
                    />

                    <BudgetProgress
                        budgetAmount={budgetAmount}
                        totalSpent={totalSpent}
                        remainingAmount={remainingAmount}
                        percentageSpent={percentageSpent}
                    />

                    {/* Monthly Expenses */}
                    <section className="budget-expenses-section">
                        <div className="budget-expenses-header">
                            <h2>Monthly Expenses</h2>

                            <span>
                                {monthlyExpenses.length} transactions
                            </span>
                        </div>

                        {monthlyExpenses.length === 0 ? (
                            <EmptyState
                                title="No expenses this month"
                                description="Your expenses for this month will appear here."
                            />
                        ) : (
                            <div className="budget-expenses-list">
                                {monthlyExpenses.map((expense) => (
                                    <div
                                        key={expense._id}
                                        className="budget-expense-row"
                                    >
                                        <div>
                                            <strong>{expense.category}</strong>

                                            <span>
                                                {expense.description ||
                                                    "No description"}
                                            </span>
                                        </div>

                                        <strong>
                                            ₹{Number(expense.amount).toLocaleString("en-IN")}
                                        </strong>
                                    </div>
                                ))}
                            </div>
                        )}
                    </section>
                </>
            )}

            {/* Add/Edit Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                title={
                    budget
                        ? "Edit Monthly Budget"
                        : "Set Monthly Budget"
                }
            >
                <BudgetForm
                    initialData={budget}
                    month={selectedMonth}
                    year={selectedYear}
                    onSubmit={handleBudgetSubmit}
                    onCancel={closeModal}
                    loading={submitting}
                />
            </Modal>
        </div>
    );
}

export default Budget;