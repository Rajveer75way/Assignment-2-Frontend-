import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Skeleton,
} from "@mui/material";
import { useGetSpendingTrendsMutation } from "../../services/api";
import styles from "./style.module.css";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";

interface FormData {
  category: string;
  startDate: string;
  endDate: string;
}

const TrackCategory: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [getSpendingTrends, { data, isLoading, isError }] =
    useGetSpendingTrendsMutation();

  const onSubmit = (data: FormData) => {
    const { category, startDate, endDate } = data;
    getSpendingTrends({ category, startDate, endDate });
  };
  let content;

  if (isLoading) {
    content = (
      <div style={{ marginTop: "20px" }}>
        <Card className={styles.card}>
          <CardContent>
            <Skeleton variant="text" width="100%" height={40} />
            <Skeleton variant="text" width="80%" height={40} />
            <Skeleton variant="text" width="90%" height={40} />
          </CardContent>
        </Card>
        <Card className={styles.card}>
          <CardContent>
            <Skeleton variant="text" width="100%" height={40} />
            <Skeleton variant="text" width="70%" height={40} />
          </CardContent>
        </Card>
      </div>
    );
  } else if (isError) {
    content = (
      <Typography color="error" style={{ marginTop: "16px" }}>
        Failed to fetch spending trends. Please check your input.
      </Typography>
    );
  }
  if (data && data.success) {
    content = (
      <div style={{ marginTop: "20px" }}>
        <Card className={styles.card}>
          <CardContent>
            <Typography variant="h5" className={styles.sectionTitle}>
              Monthly Spending
            </Typography>
            <List>
              {data.data.trends.map((trend) => (
                <ListItem key={trend.month}>
                  <ListItemText
                    primary={`Month ${trend.month}`}
                    secondary={`Total Amount: $${trend.totalAmount}`}
                  />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
        <Card className={styles.card}>
          <CardContent>
            <Typography variant="h5" className={styles.sectionTitle}>
              Suggestions
            </Typography>
            <Typography variant="body1">{data.data.suggestions}</Typography>
          </CardContent>
        </Card>
      </div>
    );
  } else {
    content = null;
  }

  return (
    <div className={styles.container}>
      <Typography variant="h4" className={styles.title}>
        Track Spending by Category
      </Typography>
      <Card className={styles.card}>
        <CardContent>
          <Typography variant="h5" className={styles.sectionTitle}>
            Filter Criteria
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <Controller
                  name="category"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Category is required" }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Category"
                      fullWidth
                      error={!!errors.category}
                      helperText={errors.category?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Controller
                  name="startDate"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Start Date is required" }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Start Date"
                      type="date"
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                      error={!!errors.startDate}
                      helperText={errors.startDate?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Controller
                  name="endDate"
                  control={control}
                  defaultValue=""
                  rules={{ required: "End Date is required" }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="End Date"
                      type="date"
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                      error={!!errors.endDate}
                      helperText={errors.endDate?.message}
                    />
                  )}
                />
              </Grid>
            </Grid>
            <div style={{ marginTop: "16px" }}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                className={styles.fetchButton}
              >
                Spending Trends and Suggestions
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {content}
    </div>
  );
};

export default TrackCategory;
