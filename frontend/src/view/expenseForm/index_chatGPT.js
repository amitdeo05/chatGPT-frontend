import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";

const categories = [
  { value: "telephone", label: "Telephone" },
  { value: "internet", label: "Internet" },
  { value: "medical", label: "Medical" },
  { value: "travel", label: "Travel" },
];

const categoryLimits = {
  telephone: { max: 1000 },
  internet: { max: 1000 },
  medical: { max: 5000 },
  travel: { max: 25000 },
};

const validationSchema = yup.object({
  category: yup.string().required("Category is required"),
  claimAmount: yup
    .number()
    .when("category", {
      is: (value) => categoryLimits.hasOwnProperty(value),
      then: yup.number().max(
        (value) => categoryLimits[value].max,
        ({ path }) => `Claim amount cannot exceed ${categoryLimits[path].max}`
      ),
    })
    .required("Claim amount is required")
    .min(1, "Claim amount must be at least 1"),
  claimDescription: yup
    .string()
    .required("Claim description is required")
    .max(200, "Claim description cannot exceed 200 characters"),
  receiptDate: yup
    .date()
    .required("Receipt date is required")
    .max(new Date(), "Receipt date cannot be in the future"),
});

const ExpenseForm = () => {
  const formik = useFormik({
    initialValues: {
      category: "",
      claimAmount: "",
      claimDescription: "",
      receiptDate: "",
    },
    validationSchema,
    onSubmit: (values) => {
      // Submit claim data to API or database
      console.log(values);
    },
  });

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Submit a Claim
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              select
              fullWidth
              label="Category"
              name="category"
              value={formik.values.category}
              error={formik.touched.category && Boolean(formik.errors.category)}
              helperText={formik.touched.category && formik.errors.category}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              {categories.map(({ value, label }) => (
                <MenuItem key={value} value={value}>
                  {label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              type="number"
              label="Claim Amount"
              name="claimAmount"
              value={formik.values.claimAmount}
              error={
                formik.touched.claimAmount && Boolean(formik.errors.claimAmount)
              }
              helperText={
                formik.touched.claimAmount &&
                (formik.errors.claimAmount ||
                  categoryLimits[formik.values.category]?.max)
              }
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Claim Description"
              name="claimDescription"
              value={formik.values.claimDescription}
              error={
                formik.touched.claimDescription &&
                Boolean(formik.errors.claimDescription)
              }
              helperText={
                formik.touched.claimDescription &&
                formik.errors.claimDescription
              }
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              type="date"
              label="Receipt Date"
              name="receiptDate"
              value={formik.values.receiptDate}
              error={
                formik.touched.receiptDate && Boolean(formik.errors.receiptDate)
              }
              helperText={
                formik.touched.receiptDate && formik.errors.receiptDate
              }
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit">
              Submit Claim
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default ExpenseForm;
