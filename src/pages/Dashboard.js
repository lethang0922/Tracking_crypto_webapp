import axios from "axios";
import React, { useState, useEffect } from 'react'
import Header from '../components/Common/Header';
import TabsComponent from '../components/Dashboard/Tabs';
import Search from "../components/Dashboard/Search";

function DashboardPage() {

  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");

  const onSearchChange = (e) => {
    setSearch(e.target.value);
  };

  //let searchFilterCoin = coins.filter((item) => item.name.toLowerCase.includes(search.toLowerCase))

  const searchFilterCoin = coins.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );
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
      <Search search={search}
        onSearchChange={onSearchChange} />
      <TabsComponent coins={searchFilterCoin} />

    </div>
  )
}

export default DashboardPage; 