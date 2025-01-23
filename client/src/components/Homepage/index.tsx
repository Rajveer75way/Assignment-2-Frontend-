import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Skeleton,
} from "@mui/material";
import { format } from "date-fns";
import styles from "./style.module.css";
import {
  useGetExpensesQuery,
  useDeleteExpenseMutation,
  useUpdateExpenseMutation,
} from "../../services/api";
import {
  useGetBudgetQuery,
  useDeleteBudgetMutation,
  useUpdateBudgetMutation,
} from "../../services/api";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Home: React.FC = () => {
  const {
    data: expensesResponse,
    isLoading: isExpensesLoading,
    isError: isExpensesError,
  } = useGetExpensesQuery();

  const {
    data: budgetsResponse,
    isLoading: isBudgetsLoading,
    isError: isBudgetsError,
  } = useGetBudgetQuery();

  const [deleteExpense] = useDeleteExpenseMutation();
  const [updateExpense] = useUpdateExpenseMutation();
  const [deleteBudget] = useDeleteBudgetMutation();
  const [updateBudget] = useUpdateBudgetMutation();
  const expenses = expensesResponse?.data || [];
  const budgets = budgetsResponse?.data || [];
  // State for expense modal
  const [isEditExpenseModalOpen, setIsEditExpenseModalOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<any>(null);
  const [updatedExpenseAmount, setUpdatedExpenseAmount] = useState<
    number | string
  >("");
  // State for budget modal
  const [isEditBudgetModalOpen, setIsEditBudgetModalOpen] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState<any>(null);
  const [updatedBudgetAmount, setUpdatedBudgetAmount] = useState<
    number | string
  >("");
  const openEditExpenseModal = (expense: any) => {
    setSelectedExpense(expense);
    setUpdatedExpenseAmount(expense.amount);
    setIsEditExpenseModalOpen(true);
  };
  const closeEditExpenseModal = () => {
    setIsEditExpenseModalOpen(false);
    setSelectedExpense(null);
  };
  const handleUpdateExpense = () => {
    if (!selectedExpense) return;

    const updatedExpense = {
      ...selectedExpense,
      amount: Number(updatedExpenseAmount),
    };
    updateExpense(updatedExpense)
      .unwrap()
      .then(() => {
        toast.success("Expense updated successfully!", {
          position: "top-center",
          autoClose: 3000,
        });
        closeEditExpenseModal();
      })
      .catch(() => {
        toast.error("Failed to update expense.");
      });
  };

  // Budget modal handlers
  const openEditBudgetModal = (budget: any) => {
    setSelectedBudget(budget);
    setUpdatedBudgetAmount(budget.amount); // Set current amount as default
    setIsEditBudgetModalOpen(true);
  };

  const closeEditBudgetModal = () => {
    setIsEditBudgetModalOpen(false);
    setSelectedBudget(null);
  };

  const handleUpdateBudget = () => {
    if (!selectedBudget) return;

    const updatedBudget = {
      ...selectedBudget,
      amount: Number(updatedBudgetAmount),
    };
    updateBudget(updatedBudget)
      .unwrap()
      .then(() => {
        toast.success("Budget updated successfully!", {
          position: "top-center",
          autoClose: 3000,
        });
        closeEditBudgetModal();
      })
      .catch(() => {
        toast.error("Failed to update budget.");
      });
  };

  const handleDeleteExpense = (id: number) => {
    deleteExpense(id);
    toast.success("Expense deleted successfully!", {
      position: "top-center",
      autoClose: 3000,
    });
  };

  const handleDeleteBudget = (id: number) => {
    deleteBudget(id);
    toast.success("Budget deleted successfully!", {
      position: "top-center",
      autoClose: 3000,
    });
  };

  let expressContent;
  if (isExpensesLoading) {
    expressContent = (
      <CardContent>
        <Skeleton variant="text" width="100%" height={40} />
        <Skeleton variant="text" width="80%" height={40} />
        <Skeleton variant="text" width="90%" height={40} />
      </CardContent>
    );
  } else if (isExpensesError) {
    expressContent = (
      <Typography color="error">Failed to load expenses.</Typography>
    );
  }
  expressContent = expenses.map((expense: any) => {
    const formattedDate = format(new Date(expense.date), "MM/dd/yyyy");
    return (
      <div key={expense._id} className={styles.item}>
        <Typography variant="body1" className={styles.itemText}>
          {expense.category}: ${expense.amount} on {formattedDate}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {expense.description}
        </Typography>
        <div className={styles.buttons}>
          <Button
            variant="outlined"
            color="primary"
            size="small"
            style={{ marginRight: "8px" }}
            onClick={() => openEditExpenseModal(expense)}
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            color="error"
            size="small"
            style={{ marginRight: "8px" }}
            onClick={() => handleDeleteExpense(expense._id)}
          >
            Delete
          </Button>
        </div>
      </div>
    );
  });
  let budgetsContent;
  if (isBudgetsLoading) {
    budgetsContent = (
      <CardContent>
        <Skeleton variant="text" width="100%" height={40} />
        <Skeleton variant="text" width="80%" height={40} />
        <Skeleton variant="text" width="90%" height={40} />
      </CardContent>
    );
  } else if (isBudgetsError) {
    budgetsContent = (
      <Typography color="error">Failed to load budgets.</Typography>
    );
  }

  budgetsContent = budgets.map((budget: any) => {
    const formattedStartDate = format(new Date(budget.startDate), "MM/dd/yyyy");
    const formattedEndDate = format(new Date(budget.endDate), "MM/dd/yyyy");
    return (
      <div key={budget._id} className={styles.item}>
        <Typography variant="body1" className={styles.itemText}>
          {budget.category}: ${budget.amount}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {formattedStartDate} - {formattedEndDate}
        </Typography>
        <div className={styles.buttons}>
          <Button
            variant="outlined"
            color="primary"
            size="small"
            style={{ marginRight: "8px" }}
            onClick={() => openEditBudgetModal(budget)}
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            color="error"
            size="small"
            style={{ marginRight: "8px" }}
            onClick={() => handleDeleteBudget(budget._id)}
          >
            Delete
          </Button>
        </div>
      </div>
    );
  });

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Typography variant="h4" className={styles.title}>
          Personal Finance Tracker
        </Typography>
        <Link to="/create-expense">
          <Button
            variant="contained"
            className={styles.customButton}
            color="primary"
          >
            Add Expense
          </Button>
        </Link>
        <Link to="/create-budget">
          <Button
            variant="contained"
            className={styles.customButton}
            color="secondary"
            style={{ marginLeft: "10px" }}
          >
            Add Budget
          </Button>
        </Link>
        <Link to="/track-category">
          <Button
            variant="contained"
            className={styles.customButton}
            color="primary"
            style={{ marginLeft: "10px" }}
          >
            {" "}
            Track Category
          </Button>
        </Link>
        <Link to="/generate-report">
          <Button
            variant="contained"
            className={styles.customButton}
            color="success"
            style={{ marginLeft: "10px" }}
          >
            {" "}
            Generate Report
          </Button>
        </Link>
      </header>

      <Grid container spacing={4} className={styles.grid}>
        <Grid item xs={12} md={6}>
          <Card className={styles.card}>
            <CardContent>
              <Typography variant="h5" className={styles.sectionTitle}>
                Recent Expenses
              </Typography>
              {expressContent}
            </CardContent>
          </Card>
        </Grid>

        {/* Budgets Section */}
        <Grid item xs={12} md={6}>
          <Card className={styles.card}>
            <CardContent>
              <Typography variant="h5" className={styles.sectionTitle}>
                Budgets
              </Typography>
              {budgetsContent}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Edit Expense Modal */}
      <Dialog open={isEditExpenseModalOpen} onClose={closeEditExpenseModal}>
        <DialogTitle>Edit Expense</DialogTitle>
        <DialogContent>
          <TextField
            label="Amount"
            type="number"
            value={updatedExpenseAmount}
            onChange={(e) => setUpdatedExpenseAmount(e.target.value)}
            fullWidth
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeEditExpenseModal} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleUpdateExpense} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Budget Modal */}
      <Dialog open={isEditBudgetModalOpen} onClose={closeEditBudgetModal}>
        <DialogTitle>Edit Budget</DialogTitle>
        <DialogContent>
          <TextField
            label="Amount"
            type="number"
            value={updatedBudgetAmount}
            onChange={(e) => setUpdatedBudgetAmount(e.target.value)}
            fullWidth
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeEditBudgetModal} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleUpdateBudget} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Home;
