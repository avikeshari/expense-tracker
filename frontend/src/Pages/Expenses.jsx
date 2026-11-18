import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import toast from "react-hot-toast";

import useExpenses from "../hooks/useExpenses";

import Button from "../Components/common/Button";
import Modal from "../Components/common/Modal";

import ExpenseForm from "../Components/expenses/ExpenseForm";
import ExpenseList from "../Components/expenses/ExpenseList";
import ExpenseFilters from "../Components/expenses/ExpenseFilters";
import ExpenseStats from "../Components/expenses/ExpenseStats";

import { formatDateForInput } from "../utils/formatDate";

const INITIAL_FILTERS = {
    search: "",
    category: "",
    startDate: "",
    endDate: "",
};

function Expenses() {
    const {
        expenses,
        loading,
        submitting,
        error,
        addExpense,
        editExpense,
        removeExpense,
    } = useExpenses();

    const [filters, setFilters] = useState(INITIAL_FILTERS);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingExpense, setEditingExpense] = useState(null);

    const filteredExpenses = useMemo(() => {
        return expenses.filter((expense) => {
            const searchTerm = filters.search.toLowerCase();

            const matchesSearch =
                expense.category.toLowerCase().includes(searchTerm) ||
                (expense.description || "")
                    .toLowerCase()
                    .includes(searchTerm);

            const matchesCategory =
                !filters.category ||
                expense.category === filters.category;

            const expenseDate = formatDateForInput(
                new Date(expense.date)
            );

            const matchesStartDate =
                !filters.startDate ||
                expenseDate >= filters.startDate;

            const matchesEndDate =
                !filters.endDate ||
                expenseDate <= filters.endDate;

            return (
                matchesSearch &&
                matchesCategory &&
                matchesStartDate &&
                matchesEndDate
            );
        });
    }, [expenses, filters]);

    const openAddModal = () => {
        setEditingExpense(null);
        setIsModalOpen(true);
    };

    const openEditModal = (expense) => {
        setEditingExpense(expense);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingExpense(null);
    };

    const handleSubmit = async (expenseData) => {
        let result;

        if (editingExpense) {
            result = await editExpense(
                editingExpense._id,
                expenseData
            );

            if (result.success) {
                toast.success("Expense updated successfully");
            }
        } else {
            result = await addExpense(expenseData);

            if (result.success) {
                toast.success("Expense added successfully");
            }
        }

        if (result.success) {
            closeModal();
        }

        return result;
    };

    const handleDelete = async (expense) => {
        const confirmed = window.confirm(
            `Delete this ${expense.category} expense of ₹${expense.amount}?`
        );

        if (!confirmed) return;

        const result = await removeExpense(expense._id);

        if (result.success) {
            toast.success("Expense deleted successfully");
        } else {
            toast.error(result.message);
        }
    };

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    const handleResetFilters = () => {
        setFilters(INITIAL_FILTERS);
    };

    return (
        <div className="page-container expenses-page">
            {/* Page Header */}
            <div className="page-header">
                <div>
                    <h1 className="page-title">
                        Expenses
                    </h1>

                    <p className="page-description">
                        Track, manage and analyze your expenses.
                    </p>
                </div>

                <Button
                    icon={Plus}
                    onClick={openAddModal}
                >
                    Add Expense
                </Button>
            </div>

            {/* Statistics */}
            <ExpenseStats
                expenses={filteredExpenses}
            />

            {/* Filters */}
            <ExpenseFilters
                filters={filters}
                onFilterChange={handleFilterChange}
                onReset={handleResetFilters}
            />

            {/* Error */}
            {error && (
                <div className="expense-error">
                    {error}
                </div>
            )}

            {/* Expense List */}
            <section className="expenses-section">
                <div className="expenses-section-header">
                    <h2>Transactions</h2>

                    <span className="expense-count">
                        {filteredExpenses.length} transactions
                    </span>
                </div>

                <ExpenseList
                    expenses={filteredExpenses}
                    loading={loading}
                    onEdit={openEditModal}
                    onDelete={handleDelete}
                />
            </section>

            {/* Add/Edit Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                title={
                    editingExpense
                        ? "Edit Expense"
                        : "Add Expense"
                }
            >
                <ExpenseForm
                    initialData={editingExpense}
                    onSubmit={handleSubmit}
                    onCancel={closeModal}
                    loading={submitting}
                />
            </Modal>
        </div>
    );
}

export default Expenses;