export const parseDate = (dateValue) => {
    if (!dateValue) return null;

    // Handle ISO strings and date-only strings consistently
    const dateString = String(dateValue).split("T")[0];

    const [year, month, day] = dateString
        .split("-")
        .map(Number);

    if (!year || !month || !day) {
        return null;
    }

    return new Date(year, month - 1, day);
};

export const formatDate = (dateValue) => {
    const date = parseDate(dateValue);

    if (!date) return "Invalid date";

    return date.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
};