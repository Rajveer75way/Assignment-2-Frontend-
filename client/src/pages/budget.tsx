import React from "react";
import BudgetForm from "../components/BudgetForm";
import { useCreateBudgetMutation } from "../services/api";
import { toast } from "react-toastify";

const BudgetCreate: React.FC = () => {
  const [createBudget, { isLoading, error }] = useCreateBudgetMutation();
  const handleBudgetSubmit = async (data: any) => {
    try {
      const response = await createBudget(data).unwrap();
      console.log(response);
      toast.success("Budget created successfully!", {
        position: "top-center",
        autoClose: 3000, 
      });
    } catch (err: any) {
      console.log(err);
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
      <BudgetForm onSubmit={handleBudgetSubmit} />
      {isLoading && <p>Creating Budget...</p>}
      {error && (
        <p>
          {getErrorMessage(error)} 
        </p>
      )}
    </div>
  );
};

export default BudgetCreate;
