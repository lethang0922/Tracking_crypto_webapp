import React from 'react';
import "./styles.css";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded"
import TrendingDownRoundedIcon from "@mui/icons-material/TrendingDownRounded"
import { Link } from 'react-router-dom';

function formatNumber(num) {
  if (num >= 1e9) {
    return (num / 1e9).toFixed(1) + 'B'; // Format as billions
  } else if (num >= 1e6) {
    return (num / 1e6).toFixed(1) + 'M'; // Format as millions
  } else {
    return num.toLocaleString('en-US'); // Format as regular number with commas
  }
}

function Grid({ coin }) {
  return (
    <Link to={`/coin/${coin.id}`}>
      <div className="grid-container">
        <div className='info-flex'>
          <img src={coin.image} className="coin-logo" />
          <div className='name-col'>
            <p className='coin-symbol'>{coin.symbol}</p>
            <p className='coin-name'>{coin.name}</p>
          </div>

        </div>
        {coin.price_change_percentage_24h > 0 ? (
          <div className='coin-trend'>
            <div className='price-chip'>
              {coin.price_change_percentage_24h.toFixed(3)}%
            </div>
            <div className="price-chip">
              <TrendingUpRoundedIcon />
            </div>
          </div>
        ) : (
          <div className='coin-trend'>
            <div className='price-chip chip-red'>
              {coin.price_change_percentage_24h.toFixed(3)}%
            </div>
            <div className="price-chip chip-red">
              <TrendingDownRoundedIcon />
            </div>
          </div>
        )}
        <div className='coin-price' style={{
          color: coin.price_change_percentage_24h > 0 ?
            "var(--green)" : "var(--red)"
        }}>
          Current price: ${coin.current_price.toLocaleString('en-US')}
        </div>

        <div className='coin-volume'>
          Total Volume: ${formatNumber(coin.total_volume)}
        </div>

        <div className='coin-market-cap'>
          Market Cap: ${formatNumber(coin.market_cap)};
        </div>
      </div>
    </Link>
  )
}

export default Grid