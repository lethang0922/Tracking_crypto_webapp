import React from 'react'
import "./styles.css"
import SearchIcon from '@mui/icons-material/Search';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

function Search({ coins }) {
  return (
    <div className='search-flex'>
      <SearchIcon />
      <Autocomplete
        style={{ width: 1000, textColor: 'White' }}
        disablePortal
        id="combo-box-demo"
        options={coins.map((coin) => coin.name)} // Map coin names to an array
        sx={{ width: 300 }}
        renderInput={(params) => (<TextField {...params} label="Coins Name"
        />)}
      />
    </div>
  )
}

export default Search