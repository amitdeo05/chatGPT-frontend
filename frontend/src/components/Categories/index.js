import Select from "@mui/material/Select";
import {InputLabel, FormControl} from '@mui/material';
const Category = ({ value, onChange, error, children }) => {
  return (
    <FormControl fullWidth>
         <InputLabel id="demo-simple-select-label">Category</InputLabel> 
    <Select
      id="category"
      name="Category"
      label="Category"
      value={value}
      onChange={onChange}
      fullWidth
      error={error ? true : false}
    >
      {children}
    </Select>
    </FormControl>
  );
};

export default Category;
