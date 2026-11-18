import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
} from "recharts";

const COLORS = [
    "#6366f1",
    "#f59e0b",
    "#10b981",
    "#ef4444",
    "#8b5cf6",
    "#06b6d4",
    "#ec4899",
    "#64748b",
];

const CategoryChart = ({ data }) => {
    const formatCurrency = (value) =>
        `₹${Number(value).toLocaleString("en-IN")}`;

    return (
        <div className="dashboard-chart-card">
            <div className="dashboard-chart-header">
                <h3>Category Breakdown</h3>
                <p>Where your money is going this month</p>
            </div>

            {data.length === 0 ? (
                <div className="chart-empty-state">
                    No expenses recorded this month.
                </div>
            ) : (
                <div className="dashboard-chart-container">
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={data}
                                dataKey="amount"
                                nameKey="category"
                                cx="50%"
                                cy="50%"
                                innerRadius={65}
                                outerRadius={100}
                                paddingAngle={3}
                            >
                                {data.map((entry, index) => (
                                    <Cell
                                        key={entry.category}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Pie>

                            <Tooltip formatter={formatCurrency} />

                            <Legend
                                verticalAlign="bottom"
                                height={40}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            )}
        </div>
    );
};

export default CategoryChart;