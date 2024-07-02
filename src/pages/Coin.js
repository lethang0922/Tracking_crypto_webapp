import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import Header from '../components/Common/Header';
import List from "../components/Dashboard/List"
import { coinObject } from '../functions/coinObject';
import CoinInfo from '../components/Coin/CoinInfo';
import { getCoinData } from '../functions/getCoindata'
import { getCoinPrices } from '../functions/getCoinPrices';
import LineChart from '../components/Coin/LineChart';
import { convertDataDate } from "../functions/convertDataDate";
import SelectDates from '../components/Coin/SelectDates';
function CoinPage() {
  const { id } = useParams();
  const [coinData, setCoinData] = useState();

  const [days, setDays] = useState(30);
  const [chartData, setChartData] = useState(); // Initialize chartData state


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
      if (prices && prices.length > 0) {
        //console.log("Hi");

        setChartData({
          labels: prices.map((price) => convertDataDate(price[0])),
          datasets: [
            {
              data: prices.map((price) => (price[1])),
              borderWidth: 1.5,
              fill: true,
              backgroundColor: "rgba(58, 128, 233,0.1)",
              tension: 0.25,
              borderColor: "#3a80e9",
              pointRadius: 0,
            },
          ],
        });
      }
    }
  }

  const handleDaysChange = async (event) => {
    setDays(event.target.value);
    const prices = await getCoinPrices(id, days);
    if (prices && prices.length > 0) {
      //console.log("Hi");

      setChartData({
        labels: prices.map((price) => convertDataDate(price[0])),
        datasets: [
          {
            data: prices.map((price) => (price[1])),
            borderWidth: 1.5,
            fill: true,
            backgroundColor: "rgba(58, 128, 233,0.1)",
            tension: 0.25,
            borderColor: "#3a80e9",
            pointRadius: 0,
          },
        ],
      });
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

      {isLoading ? (
        <div className=" grey-wrapper">
          <SelectDates days={days} handleDaysChange={handleDaysChange} />
          <LineChart chartData={chartData} />

          <CoinInfo heading={coinData.name} desc={coinData.desc} />
        </div>
      ) : (
        <p>Loading...</p>

      )}
    </div>
  )
}

export default CoinPage