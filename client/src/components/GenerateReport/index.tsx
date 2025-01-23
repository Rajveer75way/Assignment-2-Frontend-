import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  Button,
} from "@mui/material";
import { useGetFinancialReportMutation } from "../../services/api";
import styles from "./style.module.css";
import { toast } from "react-toastify";
import { useForm, Controller } from "react-hook-form";

interface FormData {
  category: string;
  startDate: string;
  endDate: string;
}

const GenerateReport: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [getFinancialReport] = useGetFinancialReportMutation();

  const onSubmit = async (data: FormData) => {
    const { category, startDate, endDate } = data;

    try {
      const response = await getFinancialReport({
        category,
        startDate,
        endDate,
      }).unwrap();
      const url = window.URL.createObjectURL(response);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Financial_Report.pdf"); // Specify the filename
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success("Financial report generated and downloaded successfully!");
    } catch (error) {
      toast.error(
        "Failed to generate financial report. Please check the console for details."
      );
      console.error("Error generating report:", error);
    }
  };

  return (
    <div className={styles.container}>
      <Typography variant="h4" className={styles.title}>
        Generate Financial Report
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
                color="secondary"
                type="submit"
                className={styles.fetchButton}
              >
                Generate Financial Report
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default GenerateReport;
