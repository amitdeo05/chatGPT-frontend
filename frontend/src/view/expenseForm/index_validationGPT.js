import React from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";

const MAX_TELEPHONE = 1000;
const MAX_INTERNET = 1000;
const MAX_MEDICAL = 5000;
const MAX_TRAVEL = 25000;
const MAX_DESCRIPTION_LENGTH = 200;

const validateForm = (data) => {
  const { category, description, receiptDate, claimAmount } = data;
  
  if (!category || !description || !receiptDate || !claimAmount) {
    return "Please fill out all required fields";
  }
  if (description.length > MAX_DESCRIPTION_LENGTH) {
    return `Description must be less than ${MAX_DESCRIPTION_LENGTH} characters`;
  }
  const dateDifference = calculateDateDifference(receiptDate);
  if (dateDifference > 30) {
    return "Receipt date cannot be more than 30 days old";
  }
  const maxAmount = getMaxAmountByCategory(category);
  if (claimAmount > maxAmount) {
    return `Claim amount cannot be more than ${maxAmount}`;
  }
  return null;
};

const calculateDateDifference = (receiptDate) => {
  const receiptTime = new Date(receiptDate).getTime();
  const submissionTime = Date.now();
  const diffInDays = Math.floor((submissionTime - receiptTime) / (1000 * 60 * 60 * 24));
  return diffInDays;
};

const getMaxAmountByCategory = (category) => {
  switch (category) {
    case "Telephone":
      return MAX_TELEPHONE;
    case "Internet":
      return MAX_INTERNET;
    case "Medical":
      return MAX_MEDICAL;
    case "Travel":
      return MAX_TRAVEL;
    default:
      return 0;
  }
};

const CategorySelect = ({ name, register, error }) => (
  <FormControl fullWidth required error={Boolean(error)}>
    <Select
      label="Category"
      {...register(name)}
    >
      <MenuItem value="Telephone">Telephone</MenuItem>
      <MenuItem value="Internet">Internet</MenuItem>
      <MenuItem value="Medical">Medical</MenuItem>
      <MenuItem value="Travel">Travel</MenuItem>
    </Select>
    <FormHelperText>{error ? error.message : ""}</FormHelperText>
  </FormControl>
);

const DescriptionTextField = ({ name, register, error }) => (
  <FormControl fullWidth required error={Boolean(error)}>
    <TextField
      label="Description"
      {...register(name)}
      multiline
      maxRows={4}
      inputProps={{ maxLength: MAX_DESCRIPTION_LENGTH }}
    />
    <FormHelperText>{error ? error.message : ""}</FormHelperText>
  </FormControl>
);

const ReceiptDateTextField = ({ name, register, error }) => (
  <FormControl fullWidth required error={Boolean(error)}>
    <TextField
      label="Receipt Date"
      {...register(name)}
      type="date"
      InputLabelProps={{
        shrink: true,
      }}
    />
    <FormHelperText>{error ? error.message : ""}</FormHelperText>
  </FormControl>
);

const ClaimAmountTextField = ({ name, register, error }) => (
  <FormControl fullWidth required error={Boolean(error)}>
     <TextField
      label="Claim Amount"
      {...register(name)}
      type="number"
      InputProps={{ inputProps: {} }}
    />
    <FormHelperText>{error ? error.message : ""}</FormHelperText>
  </FormControl>
);

const ClaimForm = () => {
    const {
    register,
    handleSubmit,
    formState: { errors },
    } = useForm();
    
    const onSubmit = (data) => {
    const error = validateForm(data);
    if (error) {
    alert(error);
    } else {
    alert("Form submitted successfully!");
    }
    };
    
    return (
    <Paper sx={{ p: 2 }}>
    <Typography variant="h4">Claim Form</Typography>
    <form onSubmit={handleSubmit(onSubmit)}>
    <Grid container spacing={2}>
    <Grid item xs={12} sm={6}>
    <CategorySelect name="category" register={register} error={errors.category} />
    </Grid>
    <Grid item xs={12} sm={6}>
    <ReceiptDateTextField
               name="receiptDate"
               register={register}
               error={errors.receiptDate}
             />
    </Grid>
    <Grid item xs={12}>
    <DescriptionTextField
               name="description"
               register={register}
               error={errors.description}
             />
    </Grid>
    <Grid item xs={12}>
    <ClaimAmountTextField
               name="claimAmount"
               register={register}
               error={errors.claimAmount}
             />
    </Grid>
    <Grid item xs={12}>
    <Box display="flex" justifyContent="flex-end">
    <Button variant="contained" type="submit">
    Submit
    </Button>
    </Box>
    </Grid>
    </Grid>
    </form>
    </Paper>
    );
    };
    
    export default ClaimForm;