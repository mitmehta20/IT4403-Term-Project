import React, { useEffect, useState } from 'react'
import './CryptoView.css'

const CryptoView = ( {parentCallback } ) => {
    const [data, setData] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [filterText,setFilterText] = useState('');
    const [selectedCoin, setSelectedCrypto] = useState(null);
    const [selectedCoinId, setSelectedCoinId] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('https://api.coinlore.net/api/tickers/');
            const data = await response.json();
            const filteredData = data['data'].map((coin) => {
                return {
                    name: coin['name'],
                    symbol: coin['symbol'],
                    id: coin['id']
                }
            })
            setData(filteredData);
            setFiltered(filteredData);
        };
        fetchData()
    }, []);

    const refreshData = async () => {
        const response = await fetch('https://api.coinlore.net/api/tickers/');
        const data = await response.json();
        setData(data);
    }

    const onFilterChange = (event) => {
        if(event.target.value) {
            setFiltered(data.filter((coin) => {
                return coin.name.toLowerCase().includes(event.target.value.toLowerCase()) || coin.symbol.toLowerCase().includes(event.target.value.toLowerCase())
            }))
        } else {
            setFiltered(data);
        }

    }

    const onCryptoClick = async (event) => {
        const cryptoId = event.currentTarget.dataset.cryptoId;
        if(cryptoId) {
            console.log(cryptoId)
            const response = await fetch(`https://api.coinlore.net/api/ticker/?id=${cryptoId}`);
            const data = await response.json();
            setSelectedCrypto(data[0]);
        } 
    }

    const onCloseCrypto = () => {
        setSelectedCrypto(null);
    }

    const populateCoins = () => {
            return filtered.map((coin) => {
                return (
                    <div className='crypto-metadata' key={coin.id} data-crypto-id={coin.id} onClick={(e) => onCryptoClick(e)}>
                        <div className='crypto-name'>{coin.name}</div>
                        <div className='crypto-symbol'>{coin.symbol}</div>
                    </div>
                )
            })
    }

    const formatNumber = (number) => {
        return Intl.NumberFormat('en-US', {
            notation: 'compact', 
            compactDisplay: 'short', 
            maximumFractionDigits: 3 
        }).format(number);
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
    <div className='crypto-full-container'>

        
        <div className={selectedCoin ? 'crypto-list' : 'crypto-list crypto-list-center'}>
        <div className='crypto-filter-bar'>
            <div className='crpyto-full-list-title'>List of Cryptocurrencies</div>
            <label>Filter:</label>
            <input onChange={onFilterChange}></input>
        </div>
        {filtered && populateCoins()}
        </div>

        {selectedCoin &&
            <div className='crypto-ind-view'>
                <button onClick={onCloseCrypto} className='crypto-close-button'>Close</button>
                <div className='crypto-ind-info'>
                    <div className='crypto-ind-title'>
                        {`${selectedCoin.name} - ${selectedCoin.symbol}`}
                    </div>
                    <div className='crypto-view-row'>
                        <div className='crypto-view-info-panel'>
                            <div className='crypto-view-info-title'>
                                Price Per Coin
                            </div>
                            <div className='crypto-view-info-value'>
                                {formatCurrency(selectedCoin.price_usd)}
                            </div>
                        </div>
                        <div className='crypto-view-info-panel'>
                            <div className='crypto-view-info-title'>
                                Volume Traded in 24hrs
                            </div>
                            <div className='crypto-view-info-value'>
                                {`${formatNumber(selectedCoin.volume24a)} Coins (${formatCurrency(selectedCoin.volume24)})`}
                            </div>
                        </div>
                    </div>

                    <div className='crypto-view-row-offset'>
                        <div className='crypto-view-info-panel'>
                            <div className='crypto-view-info-title'>
                                Total Coin Market Cap
                            </div>
                            <div className='crypto-view-info-value'>
                                {formatCurrency(selectedCoin.market_cap_usd)}
                            </div>
                        </div>
                        <div className='crypto-view-info-panel'>
                            <div className='crypto-view-info-title'>
                                Rank by Market Cap
                            </div>
                            <div className='crypto-view-info-value'>
                                {`${formatNumber(selectedCoin.rank)}`}
                            </div>
                        </div>
                    </div>

                    <div className='crypto-view-row-center'>
                                <table className='crypto-view-info-table'>
                                    <tbody className='crypto-view-info-table-body'>
                                    <tr className='crypto-view-info-table-row'>
                                        <td className='crypto-view-info-table-data-title'>Circulating Supply</td>
                                        <td className='crypto-view-info-table-data'>{formatNumber(selectedCoin.csupply)}</td>
                                    </tr>
                                    <tr className='crypto-view-info-table-row'>
                                        <td className='crypto-view-info-table-data-title'>Total Supply</td>
                                        <td className='crypto-view-info-table-data'>{formatNumber(selectedCoin.tsupply)}</td>
                                    </tr>
                                    <tr className='crypto-view-info-table-row'>
                                        <td className='crypto-view-info-table-data-title'>Max Supply</td>
                                        <td className='crypto-view-info-table-data'>{formatNumber(selectedCoin.msupply)}</td>
                                    </tr>
                                    </tbody>
                                </table>

                            <table className='crypto-view-info-table'>
                                <tbody className='crypto-view-info-table-body'>
                                    <tr className='crypto-view-info-table-row'>
                                        <td className='crypto-view-info-table-data-title'>Change in 24hrs</td>
                                        <td className='crypto-view-info-table-data'>{`${selectedCoin.percent_change_24h}%`}</td>
                                    </tr>
                                    <tr className='crypto-view-info-table-row'>
                                        <td className='crypto-view-info-table-data-title'>Change in 1hr</td>
                                        <td className='crypto-view-info-table-data'>{`${selectedCoin.percent_change_1h}%`}</td>
                                    </tr>
                                    <tr className='crypto-view-info-table-row'>
                                        <td className='crypto-view-info-table-data-title'>Change in 7 Days</td>
                                        <td className='crypto-view-info-table-data'>{`${selectedCoin.percent_change_7d}%`}</td>
                                    </tr>
                                    </tbody>
                                </table>
                    </div>
                    <div className='crypto-view-find-markets'>
                        <button onClick={(e) => parentCallback(selectedCoin.id)}>Find Top Markets For This Coin</button>
                    </div>
                </div>

            </div>}
    </div>
  )
}

export default CryptoView