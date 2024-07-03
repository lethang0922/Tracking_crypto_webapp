import React, { useState, useEffect } from 'react';
import Header from '../components/Common/Header';
import SelectCoins from '../components/Compare/SelectCoins';
import SelectDays from '../components/Coin/SelectDates';
import { getCoinData } from '../functions/getCoindata';
import { coinObject } from '../functions/coinObject';
import { getCoinPrices } from '../functions/getCoinPrices';
import List from '../components/Dashboard/List';
import CoinInfo from '../components/Coin/CoinInfo';
function ComparePage() {
  const [crypto1, setCrypto1] = useState("bitcoin");
  const [crypto2, setCrypto2] = useState("ethereum");
  const [crypto1Data, setCrypto1Data] = useState({});
  const [crypto2Data, setCrypto2Data] = useState({});
  const [days, setDays] = useState(30);
  const [priceType, setPriceType] = useState("prices");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getData();
  }, [crypto1, crypto2, days, priceType]);

  async function getData() {
    try {
      const data1 = await getCoinData(crypto1);
      const data2 = await getCoinData(crypto2);

      if (data1) {
        coinObject(setCrypto1Data, data1);
      }
      if (data2) {
        coinObject(setCrypto2Data, data2);
      }

      if (data1 && data2) {
        const prices1 = await getCoinPrices(crypto1, days, "prices");
        const prices2 = await getCoinPrices(crypto2, days, "prices");
        // Ensure prices1 and prices2 are arrays with data
        if (Array.isArray(prices1) && Array.isArray(prices2) && prices1.length > 0 && prices2.length > 0) {
          console.log("Both prices fetched", prices1, prices2);
          // Handle further operations with prices
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const handleCoinChange = async (event, isCoin2) => {
    const selectedCoin = event.target.value;
    if (isCoin2) {
      if (selectedCoin === crypto2) {
        setCrypto2('');
      } else {
        setCrypto2(selectedCoin);
        const data = await getCoinPrices(event.target.value);
        coinObject(setCrypto2Data, data)
      }
    } else {
      if (selectedCoin === crypto1) {
        setCrypto1('');
      } else {
        setCrypto1(selectedCoin);
        const data = await getCoinPrices(event.target.value);
        coinObject(setCrypto1Data, data)
      }
    }
    const prices1 = await getCoinPrices(crypto1, days, priceType);
    const prices2 = await getCoinPrices(crypto2, days, priceType);
  };



  function handleDaysChange(event) {
    setDays(event.target.value);
  }

  return (
    <div>
      <Header />
      <div className='coins-days-flex'>
        <SelectCoins
          crypto1={crypto1}
          handleCoinChange={handleCoinChange}
          crypto2={crypto2}
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
      <CoinInfo heading={crypto1Data?.name} desc={crypto1Data?.desc} />
      <CoinInfo heading={crypto2Data?.name} desc={crypto2Data?.desc} />
    </div>
  );
}

export default ComparePage;
