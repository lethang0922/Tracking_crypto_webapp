import React, { useState, useEffect } from 'react';
import Header from '../components/Common/Header';
import SelectCoins from '../components/Compare/SelectCoins';
import SelectDays from '../components/Coin/SelectDates';
import { getCoinData } from '../functions/getCoindata';
import { coinObject } from '../functions/coinObject';
import { getCoinPrices } from '../functions/getCoinPrices';
import List from '../components/Dashboard/List';
import CoinInfo from '../components/Coin/CoinInfo';
import { settingChartData } from '../functions/settingChartData';
import LineChart from '../components/Coin/LineChart';
import PriceType from '../components/Coin/PriceType';

function ComparePage() {
  const [crypto1, setCrypto1] = useState("bitcoin");
  const [crypto2, setCrypto2] = useState("ethereum");
  const [crypto1Data, setCrypto1Data] = useState({});
  const [crypto2Data, setCrypto2Data] = useState({});
  const [days, setDays] = useState(7);
  const [loading, setLoading] = useState(false);
  const [chartData, setChartData] = useState(null);
  const [priceType, setPriceType] = useState('prices');
  const handlePriceTypeChange = async (event) => {
    const newType = event.target.value;
    setPriceType(newType);
    getData(); // Fetch new data with updated price type
  };

  useEffect(() => {
    getData();
  }, [crypto1, crypto2, days, priceType]);

  async function getData() {
    setLoading(true);
    try {
      const data1 = await getCoinData(crypto1);
      const data2 = await getCoinData(crypto2);

      if (data1) {
        coinObject(setCrypto1Data, data1);
      }

      if (data2) {
        coinObject(setCrypto2Data, data2);
      }

      const prices1 = await getCoinPrices(crypto1, days, priceType);
      const prices2 = await getCoinPrices(crypto2, days, priceType);

      settingChartData(setChartData, prices1, prices2);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }

  const handleCoinChange = async (event, isCoin2) => {
    const selectedCoin = event.target.value;
    setLoading(true);
    try {
      if (isCoin2) {
        setCrypto2(selectedCoin);
      } else {
        setCrypto1(selectedCoin);
      }
    } catch (error) {
      console.error("Error handling coin change:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDaysChange = (event) => {
    setDays(event.target.value);
  };

  return (
    <div>
      <Header />
      <div className='coins-days-flex'>
        <SelectCoins
          crypto1={crypto1}
          handleCoinChange={(event) => handleCoinChange(event, false)}
          crypto2={crypto2}
          handleCoinChange2={(event) => handleCoinChange(event, true)}
        />
        <SelectDays
          days={days}
          handleDaysChange={handleDaysChange}
          noPTag={true}
        />
      </div>
      <div className='grey-wrapper' styles={{ padding: "0rem 1rem" }}>
        <List coin={crypto1Data} />
      </div>
      <div className='grey-wrapper' styles={{ padding: "0rem 1rem" }}>
        <List coin={crypto2Data} />
      </div>
      <div className="grey-wrapper">
        {loading ? <p>Loading chart data...</p> :
          <div>
            <PriceType priceType={priceType}
              handlePriceTypeChange={handlePriceTypeChange} />

            <LineChart chartData={chartData} priceType={"prices"} />
          </div>
        }
      </div>
      <CoinInfo heading={crypto1Data?.name} desc={crypto1Data?.desc} />
      <CoinInfo heading={crypto2Data?.name} desc={crypto2Data?.desc} />
    </div>
  );
}

export default ComparePage;
