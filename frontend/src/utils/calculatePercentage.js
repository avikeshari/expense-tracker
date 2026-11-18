export const calculatePercentage = (value, total) => {
    if (!total || total <= 0) {
        return 0;
    }

    return Math.min((value / total) * 100, 100);
};

export const calculateRawPercentage = (value, total) => {
    if (!total || total <= 0) {
        return 0;
    }

    return (value / total) * 100;
};