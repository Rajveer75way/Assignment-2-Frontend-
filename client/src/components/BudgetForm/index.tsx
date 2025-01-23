import React from "react";
import { useForm, Controller } from "react-hook-form";
import { TextField, Button, MenuItem } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from "./style.module.css";

interface BudgetFormProps {
  onSubmit: (data: BudgetFormInputs) => void;
}
interface BudgetFormInputs {
  amount: number;
  category: string;
  startDate: string;
  endDate: string;
  description: string;
}
// Define Yup validation schema
const today = new Date().toISOString().split("T")[0];
const schema = yup.object().shape({
  amount: yup
    .number()
    .required("Amount is required")
    .min(1, "Amount must be at least 1"),
  category: yup.string().required("Category is required"),
  startDate: yup
    .string()
    .required("Start date is required")
    .test(
      "is-today-or-future",
      "Start date cannot be in the past",
      (value) => !value || value >= today
    ),
  endDate: yup
    .string()
    .required("End date is required")
    .test(
      "is-today-or-future",
      "End date cannot be in the past",
      (value) => !value || value >= today
    )
    .test(
      "is-after-start",
      "End date must be after start date",
      function (value) {
        const { startDate } = this.parent;
        return !value || !startDate || value > startDate;
      }
    ),
  description: yup
    .string()
    .required("Description is required")
    .max(200, "Description can't exceed 200 characters"),
});

const BudgetForm: React.FC<BudgetFormProps> = ({ onSubmit }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<BudgetFormInputs>({
    resolver: yupResolver(schema), // Integrate Yup schema with React Hook Form
  });

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Create Budget</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
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
        <Controller
          name="startDate"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Start Date"
              type="date"
              variant="outlined"
              fullWidth
              InputLabelProps={{ shrink: true }}
              inputProps={{
                min: today, // Disable past dates
              }}
              error={!!errors.startDate}
              helperText={errors.startDate?.message}
            />
          )}
        />
        <Controller
          name="endDate"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="End Date"
              type="date"
              variant="outlined"
              fullWidth
              InputLabelProps={{ shrink: true }}
              inputProps={{
                min: today, // Disable past dates
              }}
              error={!!errors.endDate}
              helperText={errors.endDate?.message}
            />
          )}
        />
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
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Submit
        </Button>
      </form>
    </div>
  );
};

export default BudgetForm;
