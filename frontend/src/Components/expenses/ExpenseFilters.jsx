import { Search, RotateCcw } from "lucide-react";

import { EXPENSE_CATEGORIES } from "../../data/categories";

function ExpenseFilters({
    filters,
    onFilterChange,
    onReset,
}) {
    const handleChange = (event) => {
        const { name, value } = event.target;

        onFilterChange({
            ...filters,
            [name]: value,
        });
    };

    return (
        <div className="expense-filters">
            <div className="filter-search">
                <Search size={18} />

                <input
                    type="text"
                    name="search"
                    placeholder="Search expenses..."
                    value={filters.search}
                    onChange={handleChange}
                />
            </div>

            <select
                name="category"
                value={filters.category}
                onChange={handleChange}
            >
                <option value="">All Categories</option>

                {EXPENSE_CATEGORIES.map((category) => (
                    <option
                        key={category.name}
                        value={category.name}
                    >
                        {category.name}
                    </option>
                ))}
            </select>

            <input
                type="date"
                name="startDate"
                aria-label="Start date"
                value={filters.startDate}
                onChange={handleChange}
            />

            <input
                type="date"
                name="endDate"
                aria-label="End date"
                value={filters.endDate}
                onChange={handleChange}
            />

            <button
                type="button"
                className="filter-reset-btn"
                onClick={onReset}
                title="Reset filters"
            >
                <RotateCcw size={16} />
                <span>Reset</span>
            </button>
        </div>
    );
}

export default ExpenseFilters;