import React, { useState, useEffect } from "react";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Category from "../../components/Categories";

const categories = [
  { name: "Telephone", maxAmount: 1000 },
  { name: "Internet", maxAmount: 1000 },
  { name: "Medical", maxAmount: 5000 },
  { name: "Travel", maxAmount: 25000 },
];

const validateForm = (category, claimDescription, receiptDate, claimAmount) => {
  const errors = {};

  const currentDate = new Date();
  const receiptDateTime = new Date(receiptDate).getTime();
  const submissionDateTime = currentDate.getTime();
  const daysDifference =
    (submissionDateTime - receiptDateTime) / (1000 * 60 * 60 * 24);

  if (!category) {
    errors.category = "Please select a category.";
  }

  if (!claimDescription) {
    errors.claimDescription = "Please provide a claim description.";
  }

  if (!receiptDate) {
    errors.receiptDate = "Please select a receipt date.";
  } else if (daysDifference > 30) {
    errors.receiptDate =
      "Receipt date cannot be more than 30 days older than submission date.";
  }

  if (!claimAmount) {
    errors.claimAmount = "Please provide a claim amount.";
  } else {
    const categoryObj = categories.find((c) => c.name === category);
    const maxAmount = categoryObj.maxAmount;

    if (claimAmount > maxAmount) {
      errors.claimAmount = `Claim amount cannot be more than ${maxAmount}.`;
    }
  }

  return errors;
};

const ExpenseClaimForm = () => {
  const [category, setCategory] = useState("");
  const [claimDescription, setClaimDescription] = useState("");
  const [receiptDate, setReceiptDate] = useState("");
  const [claimAmount, setClaimAmount] = useState("");
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    setFormErrors({});
  }, [category, claimDescription, receiptDate, claimAmount]);

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleClaimDescriptionChange = (event) => {
    setClaimDescription(event.target.value);
  };

  const handleReceiptDateChange = (event) => {
    setReceiptDate(event.target.value);
  };

  const handleClaimAmountChange = (event) => {
    setClaimAmount(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validate the form
    const errors = validateForm(
      category,
      claimDescription,
      receiptDate,
      claimAmount
    );
    setFormErrors(errors);

    // If there are no errors, submit the form
    if (Object.keys(errors).length === 0) {
      console.log("Submitting form...");
      console.log({
        category,
        claimDescription,
        receiptDate,
        claimAmount,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Expense Claim Form
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Category
              id="category"
              name="Category"
              label="Category"
              value={category}
              onChange={handleCategoryChange}
              fullWidth
              select
              error={formErrors.category ? true : false}
            >
              <MenuItem value="">Select a category</MenuItem>
              {categories.map((category) => (
                <MenuItem key={category.name} value={category.name}>
                  {category.name}
                </MenuItem>
              ))}
            </Category>

     
            {formErrors.category && (
              <Typography variant="caption" color="red">
                {formErrors.category}
              </Typography>
            )}
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="claimDescription"
              name="claimDescription"
              label="Claim Description"
              fullWidth
              value={claimDescription}
              onChange={handleClaimDescriptionChange}
              error={formErrors.claimDescription ? true : false}
              helperText={formErrors.claimDescription}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="receiptDate"
              name="receiptDate"
              label="Receipt Date"
              type="date"
              fullWidth
              value={receiptDate}
              onChange={handleReceiptDateChange}
              InputLabelProps={{
                shrink: true,
              }}
              error={formErrors.receiptDate ? true : false}
              helperText={formErrors.receiptDate}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="claimAmount"
              name="claimAmount"
              label="Claim Amount ($)"
              fullWidth
              value={claimAmount}
              onChange={handleClaimAmountChange}
              error={formErrors.claimAmount ? true : false}
              helperText={formErrors.claimAmount}
            />
          </Grid>
        </Grid>
        <Box sx={{ mt: 4 }}>
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </Box>
      </Box>
    </form>
  );
};

export default ExpenseClaimForm;
