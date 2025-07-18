import React, { useEffect, useState } from 'react'
import './GlobalView.css'

const GlobalView = () => {

    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('https://api.coinlore.net/api/global/');
            const data = await response.json();
            setData(data)
        };
        fetchData()
    }, []);

    const refreshData = async () => {
        const response = await fetch('https://api.coinlore.net/api/global/');
        const data = await response.json();
        console.log(data);
        setData(data);
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
    <>
    { data &&
    <div className='global-view-container'>

        <div className='global-view-row'>

            <div className='info-panel'>
                <div className='info-panel-title'>
                    Total Volume
                </div>
                <div className='info-panel-content'>
                {data && formatNumber(data[0].total_volume)}</div>
            </div>

            <div className='info-panel'>
                <div className='info-panel-title'>
                    Total Coins
                </div>
                <div className='info-panel-content'>
                {data && formatNumber(data[0].coins_count)}</div>
            </div>

            <div className='info-panel'>
                <div className='info-panel-title'>
                    Active Markets
                </div>
                <div className='info-panel-content'>
                {data && formatNumber(data[0].active_markets)}</div>
            </div>

        </div>

        <div className='global-view-row-offset'>

        <div className='info-panel'>
                <div className='info-panel-title'>
                    Volume Change
                </div>
                <div className='info-panel-content'>
                {data && `${data[0].volume_change}%`}</div>
            </div>

            <div className='info-panel'>
                <div className='info-panel-title'>
                    Total Market Cap
                </div>
                <div className='info-panel-content'>
                {data && formatNumber(data[0].total_mcap)}</div>
            </div>

            <div className='info-panel'>
                <div className='info-panel-title'>
                    Market Cap Change
                </div>
                <div className='info-panel-content'>
                {data && `${data[0].mcap_change}%`}</div>
            </div>

        </div>

        <div className='global-view-row'>

            <div className='info-panel'>
                <div className='info-panel-title'>
                    All Time High Volume
                </div>
                <div className='info-panel-content'>
                {data && formatNumber(data[0].volume_ath)}</div>
            </div>

            <div className='info-panel'>
                <div className='info-panel-title'>
                    Average Price Change
                </div>
                <div className='info-panel-content'>
                {data && `${data[0].avg_change_percent}%`}</div>
            </div>

            <div className='info-panel'>
                <div className='info-panel-title'>
                    All Time High Market Cap
                </div>
                <div className='info-panel-content'>
                {data && formatNumber(data[0].mcap_ath)}</div>
            </div>

        </div>
    </div>
}
    </>
  )
}

export default GlobalView