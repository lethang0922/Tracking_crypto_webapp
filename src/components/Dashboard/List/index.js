import React from 'react'
import "./styles.css"
import TrendingDownRoundedIcon from '@mui/icons-material/TrendingDownRounded'
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded'
import { Tooltip } from '@mui/material';

function formatNumber(num) {
  if (num >= 1e9) {
    return (num / 1e9).toFixed(1) + 'B'; // Format as billions
  } else if (num >= 1e6) {
    return (num / 1e6).toFixed(1) + 'M'; // Format as millions
  } else {
    return num.toLocaleString('en-US'); // Format as regular number with commas
  }
}

function List({ coin }) {
  if (!coin) {
    return null; // Ensure coin is defined
  }
  return (
    <tr className='list-container'>
      <Tooltip title={`Coinlogo`}>
        <td className='info-img'>
          <img src={coin.image} className="coin-logo" />
        </td>
      </Tooltip>
      <td>
        <div className='name-col'>
          <Tooltip title={`Coin name and symbol`}>
            <div>
              <p className='coin-symbol'>{coin.symbol}</p>
              <p className='coin-name'>{coin.name}</p>
            </div>
          </Tooltip>
        </div>
      </td>
      <Tooltip title={`Trending right now`}>
        {coin.price_change_percentage_24h > 0 ? (
          <td className='coin-trend'>
            <div className='price-chip'>
              {coin.price_change_percentage_24h.toFixed(3)}%
            </div>
            <div className="price-chip td-icon">
              <TrendingUpRoundedIcon />
            </div>
          </td>
        ) : (
          <td className='coin-trend'>
            <div className='price-chip chip-red'>
              {coin.price_change_percentage_24h.toFixed(3)}%
            </div>
            <div className="price-chip chip-red  td-icon">
              <TrendingDownRoundedIcon />
            </div>
          </td>
        )}
      </Tooltip>
      <Tooltip title="Current Price">
        <td>
          <h3 className='coin-price td-right-align' style={{
            color: coin.price_change_percentage_24h > 0 ?
              "var(--green)" : "var(--red)"
          }}>
            ${coin.current_price.toLocaleString('en-US')}
          </h3>
        </td>
      </Tooltip>

      <Tooltip title={` Total volume`}>
        <td>
          <p className='coin-volume td-center-align'>
            ${formatNumber(coin.total_volume)}
          </p>
        </td>
      </Tooltip>

      <Tooltip title={` Market cap`}>
        <td>
          <p className='coin-market-cap td-center-align'>
            ${formatNumber(coin.market_cap)};
          </p>
        </td>
      </Tooltip>


    </tr>
  )
}

export default List;