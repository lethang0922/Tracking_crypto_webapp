import React, { useState } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import "./styles.css"
export default function PriceType({ priceType, handlePriceTypeChange }) {


  return (
    <div className="toogle-button">
      <ToggleButtonGroup
        color="primary"
        value={priceType}
        exclusive
        onChange={handlePriceTypeChange}
        sx={{
          "&.Mui-selected": {
            color: "var(--blue) !important",
          },
          borderColor: "var(--blue)",
          border: "unset !important",
          "& .MuiToggleButtonGroup-grouped": {
            border: "1px solid var(--blue)!important",
            borderColor: "unset",
            color: "var(--blue) !important ",
          },
          "& .MuiToggleButton-standard": {
            color: "var(--blue) !important",
          },
        }}

      >
        <ToggleButton value="prices" className="toogle-values" >Prices</ToggleButton>
        <ToggleButton value="total_volumes" className="toogle-values" >Total Volume</ToggleButton>
        <ToggleButton value="market_caps" className="toogle-values">Market Caps</ToggleButton>
      </ToggleButtonGroup>
    </div>
  );

}