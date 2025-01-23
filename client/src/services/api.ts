import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Expense {
  _id: number;
  amount: number;
  category: string;
  date: string;
  description: string;
}
interface Budget {
  _id: number;
  amount: number;
  category: string;
  startDate: Date;
  endDate: Date;
  description?: string;
}
 interface SpendingTrend {
  month: number;
  totalAmount: number;
}
 interface SpendingTrendsResponse {
  data: {
    trends: SpendingTrend[];
    suggestions: string;
  };
  message: string;
  success: boolean;
}
interface SpendingTrendsRequest {
  category: string;
  startDate: string;
  endDate: string;
}

// Create the API slice for expenses
export const expenseApi = createApi({
  reducerPath: "expenseApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),
  endpoints: (builder) => ({
    getExpenses: builder.query<Expense[], void>({
      query: () => `expenses`,
      transformResponse: (response: Expense[]) => response,
    }),
    createExpense: builder.mutation<Expense, Omit<Expense, "id">>({
      query: (newExpense) => ({
        url: `expenses`,
        method: "POST",
        body: newExpense,
      }),
    }),

    // Mutation to delete an expense
    deleteExpense: builder.mutation<void, number>({
      query: (id) => ({
        url: `expenses/${id}`,
        method: "DELETE",
      }),
    }),
      getSpendingTrends: builder.mutation<SpendingTrendsResponse, SpendingTrendsRequest>({
        query: (body) => ({
          url: '/expenses/spending-trends',
          method: 'POST',
          body,
        }),
      }),
    // Mutation to update an expense
    updateExpense: builder.mutation<Expense, Expense>({
      query: (updatedExpense) => ({
        url: `expenses/${updatedExpense._id}`,
        method: "PUT",
        body: updatedExpense,
      }),
    }),
  }),
});
// Create the API slice for budgets
export const BudgetApi = createApi({
  reducerPath: "budgetApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),
  endpoints: (builder) => ({
    getBudget: builder.query<any, void>({
      query: () => `budgets`,
      transformResponse: (response: any) => response,
    }),
    createBudget: builder.mutation<Budget, Omit<Budget, "id">>({
      query: (newBudget) => ({
        url: `budgets`,
        method: "POST",
        body: newBudget,
      }),
    }),
    // Mutation to delete a budget
    deleteBudget: builder.mutation<void, number>({
      query: (id) => ({
        url: `budgets/${id}`,
        method: "DELETE",
      }),
    }),
    // Mutation to update a budget
    updateBudget: builder.mutation<Budget, Budget>({
      query: (updatedBudget) => ({
        url: `budgets/${updatedBudget._id}`,
        method: "PUT",
        body: updatedBudget,
      }),
    }),
  }),
});

export const GenerateReportApi = createApi({
  reducerPath: 'generateReportApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api' }),
  endpoints: (builder) => ({
    getFinancialReport: builder.mutation<Blob, SpendingTrendsRequest>({
      query: (body) => ({
        url: '/financial/generate-financial-report',
        method: 'POST',
        body,
        responseHandler: (response) => response.blob(), // Ensures the API handles binary data
      }),
    }),
  }),
});

export const {useGetFinancialReportMutation} = GenerateReportApi;
export const { useGetExpensesQuery, useCreateExpenseMutation, useDeleteExpenseMutation, useUpdateExpenseMutation, useGetSpendingTrendsMutation } = expenseApi;
export const { useGetBudgetQuery, useCreateBudgetMutation, useDeleteBudgetMutation, useUpdateBudgetMutation } = BudgetApi;
