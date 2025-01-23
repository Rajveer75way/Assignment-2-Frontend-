import React from "react";
import { useForm, Controller } from "react-hook-form";
import { TextField, Button, MenuItem } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from "./style.module.css";

interface ExpenseFormProps {
  onSubmit: (data: ExpenseFormInputs) => void;
}

interface ExpenseFormInputs {
  amount: number;
  category: string;
  date: string; // Keep date as a string since it comes from an input
  description: string;
}

// Yup validation schema
const schema = yup.object({
  amount: yup
    .number()
    .typeError("Amount must be a number")
    .required("Amount is required")
    .min(1, "Amount must be greater than 0"),
  category: yup.string().required("Category is required"),
  date: yup
    .string()
    .required("Date is required")
    .test("is-future-date", "Date cannot be in the past", (value) => {
      if (!value) return false;
      const today = new Date().setHours(0, 0, 0, 0);
      const selectedDate = new Date(value).setHours(0, 0, 0, 0);
      return selectedDate >= today;
    }),
  description: yup.string().required("Description is required"),
});

const ExpenseForm: React.FC<ExpenseFormProps> = ({ onSubmit }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ExpenseFormInputs>({
    resolver: yupResolver(schema),
  });

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Create Expense</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        {/* Amount Field */}
        <Controller
          name="amount"
          control={control}
          defaultValue={0}
          render={({ field }) => (
            <TextField
              {...field}
              label="Amount"
              type="number"
              variant="outlined"
              fullWidth
              error={!!errors.amount}
              helperText={errors.amount?.message}
            />
          )}
        />
        <Controller
          name="category"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Category"
              select
              variant="outlined"
              fullWidth
              error={!!errors.category}
              helperText={errors.category?.message}
            >
              <MenuItem value="Food">Food</MenuItem>
              <MenuItem value="Transport">Transport</MenuItem>
              <MenuItem value="Shopping">Shopping</MenuItem>
              <MenuItem value="Entertainment">Entertainment</MenuItem>
              <MenuItem value="Utilities">Utilities</MenuItem>
              <MenuItem value="Healthcare">Healthcare</MenuItem>
              <MenuItem value="Education">Education</MenuItem>
              <MenuItem value="Rent">Rent</MenuItem>
              <MenuItem value="Salary">Salary</MenuItem>
              <MenuItem value="Miscellaneous">Miscellaneous</MenuItem>
            </TextField>
          )}
        />

        {/* Date Field */}
        <Controller
          name="date"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Date"
              type="date"
              variant="outlined"
              fullWidth
              InputLabelProps={{ shrink: true }}
              inputProps={{
                min: new Date().toISOString().split("T")[0], // Disable past dates
              }}
              error={!!errors.date}
              helperText={errors.date?.message}
            />
          )}
        />

        {/* Description Field */}
        <Controller
          name="description"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Description"
              multiline
              rows={3}
              variant="outlined"
              fullWidth
              error={!!errors.description}
              helperText={errors.description?.message}
            />
          )}
        />

        {/* Submit Button */}
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Submit
        </Button>
      </form>
    </div>
  );
};

export default ExpenseForm;
