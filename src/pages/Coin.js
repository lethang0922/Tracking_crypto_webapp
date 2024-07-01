import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import Header from '../components/Common/Header';
import List from "../components/Dashboard/List"
import { coinObject } from '../functions/coinObject';
import CoinInfo from '../components/Coin/CoinInfo';
import { getCoinData } from '../functions/getCoindata'
import { getCoinPrices } from '../functions/getCoinPrices';
function CoinPage() {
  const { id } = useParams();
  const [coinData, setCoinData] = useState();
  const [days, setDays] = useState(30);
  useEffect(() => {
    if (id) {
      getData();

    }
  }, [id])
  const isLoading = coinData;

  async function getData() {
    const data = await getCoinData(id)
    if (data) {
      coinObject(setCoinData, data)
      const prices = await getCoinPrices(id, days);
      if (prices.length > 0) {
        console.log("Hi");
      }
    }

  }
  return (
    <div>
      <Header />
      <table className=" grey-wrapper">
        <tbody>
          <List coin={coinData} />
        </tbody>

      </table>
      <div className=" grey-wrapper">
        {isLoading ? (
          <CoinInfo heading={coinData.name} desc={coinData.desc} />
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  )
}

export default CoinPage