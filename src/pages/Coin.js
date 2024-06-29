import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import Header from '../components/Common/Header';
function CoinPage() {
  const { id } = useParams();
  const [coinData, setCoinData] = useState(true);
  useEffect(() => {
    if (id) {
      axios.get(`https://api.coingecko.com/api/v3/coins/${id}`)
        .then((response) => {
          console.log("RESPONSE>>>", response);

        })
        .catch((error) => {
          console.log("ERROR>>>", error);
        });
    }
  }, [id])

  return (
    <div>
      <Header />
    </div>
  )
}

export default CoinPage