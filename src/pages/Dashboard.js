import axios from "axios";
import React, { useState, useEffect } from 'react';
import Header from '../components/Common/Header';
import TabsComponent from '../components/Dashboard/Tabs';
import Search from "../components/Dashboard/Search";
import PaginationComponent from "../components/Dashboard/Pagination";
import { get100Coins } from "../functions/get100Coins";

function DashboardPage() {
  const [coins, setCoins] = useState([]);
  const [paginatedCoins, setPaginatedCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    handlePageChange(null, page); // Trigger page change to update pagination when coins or search changes
  }, [coins, search]);

  const getData = async () => {
    const myCoins = await get100Coins();
    if (myCoins) {
      setCoins(myCoins);
      setPaginatedCoins(myCoins.slice(0, 10));
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
    let previousIndex = (value - 1) * 10;
    const filteredCoins = coins.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.symbol.toLowerCase().includes(search.toLowerCase())
    );
    setPaginatedCoins(filteredCoins.slice(previousIndex, previousIndex + 10));
  };

  const onSearchChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div>
      <Header />
      <Search search={search} onSearchChange={onSearchChange} />
      <TabsComponent coins={paginatedCoins} />
      <PaginationComponent page={page} handlePageChange={handlePageChange} />
    </div>
  );
}

export default DashboardPage;
