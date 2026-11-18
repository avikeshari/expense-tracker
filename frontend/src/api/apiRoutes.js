const API_ROUTES = {
    EXPENSES: {
        BASE: "/expenses",
        SUMMARY: "/expenses/summary",
        BY_ID: (id) => `/expenses/${id}`,
    },

    BUDGET: {
        BASE: "/budget",
        BY_ID: (id) => `/budget/${id}`,
    },
};

export default API_ROUTES;