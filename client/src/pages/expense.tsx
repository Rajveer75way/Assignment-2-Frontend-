import React from "react";
import ExpenseForm from "../components/ExpenseForm";
import { useCreateExpenseMutation } from "../services/api";
import { toast } from "react-toastify";

const ExpenseCreate: React.FC = () => {
  const [createExpense, { isLoading, error }] = useCreateExpenseMutation();
  const handleExpenseSubmit = async (data: any) => {
    try {
      const response = await createExpense(data).unwrap();
      console.log(response);
      toast.success("Expense created successfully!", {
        position: "top-center",
        autoClose: 3000,
      });
    } catch (err: any) {
      toast.error(err.data.message, {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };
  const getErrorMessage = (error: any): string => {
    if (error && error.data && typeof error.data === "object") {
      return "Something went wrong!";
    }
    return "An unexpected error occurred.";
  };
  return (
    <div>
      <ExpenseForm onSubmit={handleExpenseSubmit} />
      {isLoading && <p>Creating expense...</p>}
      {error && <p>{getErrorMessage(error)}</p>}
    </div>
  );
};

export default ExpenseCreate;
