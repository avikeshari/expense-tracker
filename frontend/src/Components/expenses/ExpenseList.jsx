import ExpenseItem from "./ExpenseItem";

import Loader from "../common/Loader";
import EmptyState from "../common/EmptyState";

import { Wallet } from "lucide-react";

function ExpenseList({
    expenses,
    loading,
    onEdit,
    onDelete,
}) {
    if (loading) {
        return (
            <Loader message="Loading expenses..." />
        );
    }

    if (!expenses || expenses.length === 0) {
        return (
            <EmptyState
                icon={Wallet}
                title="No expenses found"
                description="Try changing your filters or add your first expense."
            />
        );
    }

    return (
        <div className="expense-list">
            {expenses.map((expense) => (
                <ExpenseItem
                    key={expense._id}
                    expense={expense}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
}

export default ExpenseList;