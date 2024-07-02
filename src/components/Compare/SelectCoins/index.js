import React, { useEffect, useState } from 'react';
import { get100Coins } from '../../../functions/get100Coins';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import './styles.css';

function SelectCoins({ crypto1, crypto2, handleCoinChange }) {
  const [allCoins, setAllCoins] = useState([]);

  const styles = {
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
  };



  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const myCoins = await get100Coins();
    setAllCoins(myCoins);
    if (myCoins.length > 0) {

    }
  }

  return (
    <div className='coins-flex'>
      <p>Crypto1</p>
      <Select
        label="Crypto1"
        value={crypto1}
        onChange={(event) => handleCoinChange(event, false)}
        sx={styles}
      >
        {allCoins.length === 0 ? (
          <MenuItem value="">Loading...</MenuItem>
        ) : (
          allCoins.map((coin) => (
            <MenuItem key={coin.id} value={coin.id} disabled={coin.id === crypto2}>
              {coin.name}
            </MenuItem>
          ))
        )}
      </Select>
      <p>Crypto2</p>
      <Select
        label="Crypto2"
        value={crypto2}
        onChange={(event) => handleCoinChange(event, true)}
        sx={styles}
      >
        {allCoins.length === 0 ? (
          <MenuItem value="">Loading...</MenuItem>
        ) : (
          allCoins.map((coin) => (
            <MenuItem key={coin.id} value={coin.id} disabled={coin.id === crypto1}>
              {coin.name}
            </MenuItem>
          ))
        )}
      </Select>
    </div>
  );
}

export default SelectCoins;
