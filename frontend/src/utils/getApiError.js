const getApiError = (error, fallback = "Something went wrong.") => {
    if (error.response?.data?.message) {
        return error.response.data.message;
    }

    if (error.response?.data?.error) {
        return error.response.data.error;
    }

    if (error.message === "Network Error") {
        return "Unable to connect to the server. Please check your connection.";
    }

    if (error.response?.status === 404) {
        return "The requested resource was not found.";
    }

    if (error.response?.status === 500) {
        return "Server error. Please try again later.";
    }

    return error.message || fallback;
};

export default getApiError;