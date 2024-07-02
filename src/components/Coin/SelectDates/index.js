import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState } from 'react';
import './styles.css'
export default function SelectDates({ days, handleDaysChange }) {

  return (
    <div className='select-days'>
      <FormControl fullWidth>
        <p> Price Change In</p>

        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={days}
          onChange={handleDaysChange}
          sx={{
            height: "2.5rem",
            color: "var(--white)",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "var(--white)",
            },
            "& .MuiSvgIcon-root": {
              color: "var(--white)",
            },
            "&:hover": {
              "&& fieldset": {
                borderColor: "#3a80e9",
              },
            },
          }}
        >
          <MenuItem value={7}>A Week</MenuItem>
          <MenuItem value={30}>A Month</MenuItem>
          <MenuItem value={90}>3 Months</MenuItem>
          <MenuItem value={180}>Half Year</MenuItem>
          <MenuItem value={365}>A Year</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}