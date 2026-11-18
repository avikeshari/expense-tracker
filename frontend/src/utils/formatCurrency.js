const currencyFormatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
});

export const formatCurrency = (amount = 0) => {
    return currencyFormatter.format(Number(amount) || 0);
};