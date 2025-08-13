import { apiSlice } from "../api/apiSlice";

const categorieApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCategorie: builder.query({
            query: (pathname) => ({
                url: `/categorys${pathname}`,
            }),
            providesTags: ["categorys"],
        }),

        // Update an order status (PUT)
        updateCategorie: builder.mutation({
            query: ({ categorieId, data }) => ({
                url: `/categorys/${categorieId}`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: ["categorys"],
        }),
        addCategorie: builder.mutation({
            query: (data) => ({
                url: `/categorys`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ["categorys"],
        }),

        // Delete an order (DELETE)
        deleteCategorie: builder.mutation({
            query: (categorieId) => ({
                url: `/categorys/${categorieId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ["categorys"],
        }),
    }),
});

// Export hooks for using the defined API endpoints
export const {
    useAddCategorieMutation, useGetCategorieQuery, useDeleteCategorieMutation, useUpdateCategorieMutation
} = categorieApiSlice;
