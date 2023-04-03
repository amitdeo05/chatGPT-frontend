import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";

const ExpenseForm = () => {
  const categoryList = [
    {
      value: 1,
      label: "Telephone",
    },
    {
      value: 2,
      label: "Internet",
    },
    {
      value: 3,
      label: "Medical",
    },
    {
      value: 4,
      label: "Travel",
    },
  ];
  return (
    <Container maxWidth="lg">
      <Grid container justifyContent="center" spacing={3}>
        <Grid item md={12}>
          {" "}
          <Typography
            textAlign="center"
            variant="h3"
            component="h1"
            fontWeight="700"
            pt={3}
          >
            Claim Expense{" "}
          </Typography>{" "}
        </Grid>
        <Grid item md={6} container spacing={4} justifyContent="center">
          <Grid item md={9}>
            {" "}
            <TextField
              variant="outlined"
              select
              label="Category Name"
              fullWidth
            >
              {categoryList.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item md={9}>
            {" "}
            <TextField
              variant="outlined"
              type="number"
              label="Claim Amount"
              fullWidth
            ></TextField>
          </Grid>
          <Grid item md={9}>
            {" "}
            <TextField
              variant="outlined"
              multiline
              rows={7}
              label="Claim Description"
              fullWidth
            ></TextField>
          </Grid>
          <Grid item md={9}>
            {" "}
            <TextField
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              type="date"
              label="Receipt Date"
              fullWidth
            ></TextField>
          </Grid>
          <Grid item md={9} align="center">
            {" "}
            <Button color="success" variant="contained" size="large">
              {" "}
              Submit
            </Button>{" "}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ExpenseForm;
