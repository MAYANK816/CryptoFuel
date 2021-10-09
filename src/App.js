import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Coindata from './Coin';
import './App.css';
function App() {

const [Coins, setCoin] = useState([]);
const [search,setsearch] = useState('');
useEffect(() => {
  axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=1000&page=1&sparkline=false')
  .then(res=>{
    setCoin(res.data);
   // console.log(res.data);
  }).catch(error=>{
    console.log(error);
  })
},[]);

const handleChange=(e)=>{
  setsearch(e.target.value);
};
const filteredCoins=Coins.filter(coin => coin.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="coin-app">
      <div className="coin_search">
        <h1 className="coint_text">Search...</h1>
        <form>
          <input type="text" placeholder='Search' className="coin_input" onChange={handleChange}></input>
          </form>
        
      </div>
      {
        filteredCoins.map(coin=>{
          return(
              <Coindata key={coin.id}
              name={coin.name}
              image={coin.image}
              symbol={coin.symbol}
              price={coin.current_price}
              volume={coin.total_volume}
              priceChange={coin.price_change_percentage_24h}
              />

          )
        })
      }
    </div>
  );
}

export default App;
