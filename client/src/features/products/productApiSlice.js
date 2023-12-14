import { apiSlice } from "../../redux/reducers/apiSlice";

export const productApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProduct: builder.query({
            query: (productId) => `/product/${productId}`,
            providesTags: ["products"],
        }),
        getProducts: builder.query({
            query: () => "/product",
            providesTags: ["products"],
        }),
        addProduct: builder.mutation({
            query: (productData) => ({
                url: "/product",
                method: "POST",
                body: { ...productData },
            }),
            invalidatesTags: ["products"],
        }),
        updateProduct: builder.mutation({
            query: (args) => {
                const { productId, ...productData } = args;
                return {
                    url: `/product/${productId}`,
                    method: "PUT",
                    body: { ...productData },
                };
            },
            invalidatesTags: ["products"],
        }),
        deleteProduct: builder.mutation({
            query: (productId) => ({
                url: `/product/${productId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["products"],
        }),
        commentProduct: builder.mutation({
            query: (args) => {
                const { productId, comment } = args;
                return {
                    url: `/product/comment/${productId}`,
                    method: "PUT",
                    body: { comment },
                };
            },
            invalidatesTags: ["products"],
        }),
        deleteCommentProduct: builder.mutation({
            query: (args) => {
                const { productId, commentId } = args;
                return {
                    url: `/product/comment/${productId}/${commentId}`,
                    method: "DELETE",
                };
            },
            invalidatesTags: ["products"],
        }),
    }),
});

export const {
    useGetProductQuery,
    useGetProductsQuery,
    useAddProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
    useCommentProductMutation,
    useDeleteCommentProductMutation,
} = productApiSlice;
