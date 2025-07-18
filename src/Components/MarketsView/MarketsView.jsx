import { useEffect, useState } from 'react'
import React from 'react'
import './MarketView.css'

const MarketsView = ( { coinId, parentCallback } ) => {

  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
        const response = await fetch(`https://api.coinlore.net/api/coin/markets/?id=${coinId}`);
        const data = await response.json();
        console.log(data)
        setData(data)
    };
    fetchData()
}, []);

    const getMarketInfoData = () => {
        return data.map((market) => (
          <>
            {market.name && <tr className='market-table-row' key={market.id}>
                <td className='market-table-data'>{market.name}</td>
                <td className='market-table-data'>{market.base}</td>
                <td className='market-table-data'>{market.quote}</td>
                <td className='market-table-data'>{formatCurrency(market.price_usd)}</td>
                <td className='market-table-data'>{formatCurrency(market.volume_usd)}</td>
            </tr>}
            </>
        ));
    }

    const formatCurrency = (number) => {
      return Intl.NumberFormat('en-US', { 
          style: 'currency', 
          currency: 'USD', 
          notation: 'compact', 
          compactDisplay: 'short', 
          maximumFractionDigits: 3 
      }).format(number);
  }

  return (
    <div className='market-full-container'>
      <button onClick={parentCallback}>Back to Crypto Search</button>
      <table className='market-table'>
        <thead>
          <tr className='market-table-row'>
            <th>Market Name</th>
            <th>Coin Symbol</th>
            <th>Quote</th>
            <th>Price per Coin (USD)</th>
            <th>Total Volume (USD)</th>
          </tr>
        </thead>
        <tbody className='market-table-body'>
          {data && getMarketInfoData()}
        </tbody>
      </table>

    </div>
  )
}

export default MarketsView