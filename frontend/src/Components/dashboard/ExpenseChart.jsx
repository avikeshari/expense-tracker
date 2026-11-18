import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
} from "recharts";

const ExpenseChart = ({ data }) => {
    const formatCurrency = (value) =>
        new Intl.NumberFormat("en-IN", {
            notation: "compact",
            maximumFractionDigits: 1,
        }).format(value);

    return (
        <div className="dashboard-chart-card">
            <div className="dashboard-chart-header">
                <h3>Monthly Spending</h3>
                <p>Expense trend over the last 6 months</p>
            </div>

            {data.length === 0 ? (
                <div className="chart-empty-state">
                    No spending data available.
                </div>
            ) : (
                <div className="dashboard-chart-container">
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart
                            data={data}
                            margin={{ top: 10, right: 10, left: 0, bottom: 5 }}
                        >
                            <CartesianGrid
                                strokeDasharray="3 3"
                                vertical={false}
                            />

                            <XAxis
                                dataKey="month"
                                axisLine={false}
                                tickLine={false}
                            />

                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tickFormatter={formatCurrency}
                            />

                            <Tooltip
                                formatter={(value) => [
                                    `₹${Number(value).toLocaleString("en-IN")}`,
                                    "Expenses",
                                ]}
                            />

                            <Bar
                                dataKey="amount"
                                fill="#6366f1"
                                radius={[6, 6, 0, 0]}
                                maxBarSize={45}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            )}
        </div>
    );
};

export default ExpenseChart;