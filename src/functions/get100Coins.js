import axios from "axios";

export const get100Coins = () => {
  const myCoins = axios.get("https://api.coingecko.com/api/v3/coins/markets", {
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
      return response.data
    })
    .catch((error) => {
      console.log("ERROR>>>", error);
    });
  return myCoins;
}