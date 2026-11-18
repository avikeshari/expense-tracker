export const EXPENSE_CATEGORIES = [
    {
        name: "Food",
        icon: "Utensils",
        color: "#F59E0B",
    },
    {
        name: "Travel",
        icon: "Car",
        color: "#3B82F6",
    },
    {
        name: "Shopping",
        icon: "ShoppingBag",
        color: "#EC4899",
    },
    {
        name: "Bills",
        icon: "Receipt",
        color: "#8B5CF6",
    },
    {
        name: "Health",
        icon: "HeartPulse",
        color: "#10B981",
    },
    {
        name: "Education",
        icon: "GraduationCap",
        color: "#06B6D4",
    },
    {
        name: "Entertainment",
        icon: "Gamepad2",
        color: "#F97316",
    },
    {
        name: "Other",
        icon: "CircleEllipsis",
        color: "#64748B",
    },
];

export const CATEGORY_NAMES = EXPENSE_CATEGORIES.map(
    (category) => category.name
);