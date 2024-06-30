import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import Header from '../components/Common/Header';
import List from "../components/Dashboard/List"
import { coinObject } from '../functions/coinObject';
function CoinPage() {
  const { id } = useParams();
  const [coinData, setCoinData] = useState();
  useEffect(() => {
    if (id) {
      axios.get(`https://api.coingecko.com/api/v3/coins/${id}`)
        .then((response) => {
          console.log("RESPONSE>>>", response);
          coinObject(setCoinData, response.data);
        })
        .catch((error) => {
          console.log("ERROR>>>", error);
        });
    }
  }, [id])

  return (
    <div>
      <Header />
      <table>
        <tbody>
          <List coin={coinData} />
        </tbody>
      </table>
    </div>
  )
}

export default CoinPage