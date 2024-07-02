import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Common/Header';
import List from "../components/Dashboard/List";
import { coinObject } from '../functions/coinObject';
import CoinInfo from '../components/Coin/CoinInfo';
import { getCoinData } from '../functions/getCoindata';
import { getCoinPrices } from '../functions/getCoinPrices';
import LineChart from '../components/Coin/LineChart';
import { convertDataDate } from "../functions/convertDataDate";
import SelectDates from '../components/Coin/SelectDates';
import { settingChartData } from '../functions/settingChartData';
import PriceType from '../components/Coin/PriceType';

function CoinPage() {
  const { id } = useParams();
  const [coinData, setCoinData] = useState();
  const [days, setDays] = useState(30);
  const [chartData, setChartData] = useState(); // Initialize chartData state
  const [priceType, setPriceType] = useState('prices');

  useEffect(() => {
    if (id) {
      getData();
    }
  }, [id]);

  const isLoading = coinData;

  async function getData() {
    const data = await getCoinData(id);
    if (data) {
      coinObject(setCoinData, data);
      const prices = await getCoinPrices(id, days, priceType);
      if (prices && prices.length > 0) {
        settingChartData(setChartData, prices);

      }
    }
  }

  const handleDaysChange = async (event) => {
    const newDays = event.target.value;
    setDays(newDays);
    const prices = await getCoinPrices(id, newDays, priceType);
    if (prices && prices.length > 0) {
      settingChartData(setChartData, prices);
    }
  };

  const handlePriceTypeChange = async (event, newType) => {
    setPriceType(newType);
    const prices = await getCoinPrices(id, days, newType); // Use the correct variable for days
    if (prices && prices.length > 0) {
      settingChartData(setChartData, prices);
    }
  };


  return (
    <div>
      <Header />
      <table className="grey-wrapper">
        <tbody>
          <List coin={coinData} />
        </tbody>
      </table>

      {isLoading ? (
        <div className="grey-wrapper">
          <SelectDates days={days} handleDaysChange={handleDaysChange} />
          <PriceType priceType={priceType}
            handlePriceTypeChange={handlePriceTypeChange} />
          <LineChart chartData={chartData} />
          <CoinInfo heading={coinData?.name} desc={coinData?.desc} />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default CoinPage;
