import axios from "axios";
import React, { useState, useEffect } from 'react'
import Header from '../components/Common/Header';
import TabsComponent from '../components/Dashboard/Tabs';

function DashboardPage() {

  const [coins, setCoins] = useState([]);

  // fetch(
  //   'https://api.coinlore.net/api/tickers/'
  // ).then((res) => res.json())
  //   .then((data) => { });

  // https://api.coinpaprika.com/v1/coins/btc-bitcoin/ohlcv/latest
  useEffect(() => {
    axios.get("https://api.coingecko.com/api/v3/coins/markets", {
      params: {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: 100,
        page: 1,
        sparkline: false
      },
      headers: {
        'accept': 'application/json',
        'x-cg-demo-api-key': 'CG-gEDdTTUj9tZwDtp6d7cz5L98'
      }
    })
      .then((response) => {
        console.log("RESPONSE>>>", response);
        setCoins(response.data);
      })
      .catch((error) => {
        console.log("ERROR>>>", error);
      });
  }, []);
  return (
    <div>
      <Header />
      <TabsComponent coins={coins} />
    </div>
  )
}

export default DashboardPage; 