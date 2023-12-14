import { apiSlice } from "../../redux/reducers/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        signIn: builder.mutation({
            query: (credentials) => ({
                url: "/user/login",
                method: "POST",
                body: { ...credentials },
            }),
        }),
        signUp: builder.mutation({
            query: (credentials) => ({
                url: "/user/register",
                method: "POST",
                body: { ...credentials },
            }),
        }),
    }),
});

export const { useSignInMutation, useSignUpMutation } = authApiSlice;
