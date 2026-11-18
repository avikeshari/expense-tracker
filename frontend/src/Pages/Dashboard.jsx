import { useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CalendarDays } from "lucide-react";

import useExpenses from "../hooks/useExpenses";
import useBudget from "../hooks/useBudget";

import SummaryCards from "../Components/dashboard/SummaryCards";
import ExpenseChart from "../Components/dashboard/ExpenseChart";
import CategoryChart from "../Components/dashboard/CategoryChart";

import { parseDate } from "../utils/parseDate";

const Dashboard = () => {
    const {
        expenses = [],
        loading: expensesLoading,
    } = useExpenses();

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    const {
        budget,
        monthlyExpenses: budgetMonthlyExpenses,
        remainingAmount,
        loading: budgetLoading,
    } = useBudget(currentMonth, currentYear);

    const loading = expensesLoading || budgetLoading;

    const formatCurrency = (value) =>
        new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
        }).format(value || 0);

    // Safely convert an expense date into a Date object
    const getExpenseDate = parseDate;
    /*const getExpenseDate = (expense) => {
        if (!expense.date) return null;

        const dateString = String(expense.date).split("T")[0];
        const [year, month, day] = dateString.split("-").map(Number);

        return new Date(year, month - 1, day);
    };*/

    // Current month's expenses
    const currentMonthExpenses = useMemo(() => {
        return expenses.filter((expense) => {
            const date = getExpenseDate(expense);

            return (
                date &&
                date.getMonth() + 1 === currentMonth &&
                date.getFullYear() === currentYear
            );
        });
    }, [expenses, currentMonth, currentYear]);

    // Current month's total spending
    const monthlyTotal = useMemo(() => {
        return currentMonthExpenses.reduce(
            (total, expense) => total + Number(expense.amount || 0),
            0
        );
    }, [currentMonthExpenses]);

    // Six-month spending trend
    const monthlyTrend = useMemo(() => {
        const months = [];

        for (let i = 5; i >= 0; i--) {
            const date = new Date(currentYear, currentMonth - 1 - i, 1);

            const month = date.getMonth();
            const year = date.getFullYear();

            const monthExpenses = expenses.filter((expense) => {
                const expenseDate = getExpenseDate(expense);

                return (
                    expenseDate &&
                    expenseDate.getMonth() === month &&
                    expenseDate.getFullYear() === year
                );
            });

            const amount = monthExpenses.reduce(
                (total, expense) => total + Number(expense.amount || 0),
                0
            );

            months.push({
                month: date.toLocaleString("en-IN", {
                    month: "short",
                }),
                amount,
            });
        }

        return months;
    }, [expenses, currentMonth, currentYear]);

    // Category breakdown for current month
    const categoryData = useMemo(() => {
        const categoryTotals = {};

        currentMonthExpenses.forEach((expense) => {
            const category = expense.category || "Other";

            categoryTotals[category] =
                (categoryTotals[category] || 0) +
                Number(expense.amount || 0);
        });

        return Object.entries(categoryTotals)
            .map(([category, amount]) => ({
                category,
                amount,
            }))
            .sort((a, b) => b.amount - a.amount);
    }, [currentMonthExpenses]);

    // Recent expenses
    const recentExpenses = useMemo(() => {
        return [...expenses]
            .sort((a, b) => {
                return (
                    new Date(b.date).getTime() -
                    new Date(a.date).getTime()
                );
            })
            .slice(0, 5);
    }, [expenses]);

    const monthName = currentDate.toLocaleString("en-IN", {
        month: "long",
        year: "numeric",
    });

    if (loading) {
        return (
            <div className="page-container">
                <div className="dashboard-loading">
                    Loading dashboard...
                </div>
            </div>
        );
    }

    return (
        <div className="page-container">
            <div className="dashboard-page-header">
                <div>
                    <h1 className="page-title">Dashboard</h1>

                    <p className="page-description">
                        Here's an overview of your financial activity.
                    </p>
                </div>

                <div className="dashboard-current-period">
                    <CalendarDays size={18} />
                    <span>{monthName}</span>
                </div>
            </div>

            {/* Summary Cards */}
            <SummaryCards
                monthlyExpenses={monthlyTotal}
                monthlyBudget={Number(budget?.amount || 0)}
                remainingBudget={
                    Number(budget?.amount || 0) - monthlyTotal
                }
                transactionCount={currentMonthExpenses.length}
            />

            {/* Charts */}
            <div className="dashboard-charts-grid">
                <ExpenseChart data={monthlyTrend} />
                <CategoryChart data={categoryData} />
            </div>

            {/* Recent Transactions */}
            <div className="dashboard-recent-card">
                <div className="dashboard-recent-header">
                    <div>
                        <h3>Recent Transactions</h3>
                        <p>Your latest expense records</p>
                    </div>

                    <Link
                        to="/expenses"
                        className="dashboard-view-all"
                    >
                        View All
                        <ArrowRight size={16} />
                    </Link>
                </div>

                {recentExpenses.length === 0 ? (
                    <div className="dashboard-empty-state">
                        <p>No transactions yet.</p>
                        <Link to="/expenses">
                            Add your first expense
                        </Link>
                    </div>
                ) : (
                    <div className="dashboard-recent-list">
                        {recentExpenses.map((expense) => {
                            const date = getExpenseDate(expense);

                            return (
                                <div
                                    className="dashboard-recent-item"
                                    key={expense._id}
                                >
                                    <div className="dashboard-recent-details">
                                        <div className="dashboard-recent-category">
                                            {expense.category || "Other"}
                                        </div>

                                        <div className="dashboard-recent-description">
                                            {expense.description || "Expense"}
                                        </div>

                                        <div className="dashboard-recent-date">
                                            {date
                                                ? date.toLocaleDateString("en-IN", {
                                                    day: "numeric",
                                                    month: "short",
                                                    year: "numeric",
                                                })
                                                : "Date unavailable"}
                                        </div>
                                    </div>

                                    <div className="dashboard-recent-amount">
                                        -{formatCurrency(expense.amount)}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;