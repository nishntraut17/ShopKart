import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
    baseUrl: "https://shopkart-backend-ko76.onrender.com/api",
    credentials: "include",

    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token;
        if (token) {
            headers.set("authorization", `Bearer ${token}`);
        }

        return headers;
    },
});

export const apiSlice = createApi({
    baseQuery,
    endpoints: () => ({}),
});