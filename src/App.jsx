import React, { useState } from 'react'
import './App.css'
import Header from './Components/Header/Header'
import GlobalView from './Components/GlobalView/GlobalView';
import MarketsView from './Components/MarketsView/MarketsView';
import CryptoView from './Components/CryptoView/CryptoView';

function App() {
  const [ view, setView ] = useState('global');
  const [ cryptoId, setCryptoId ] = useState('90');

  const headerCallback = (selectedView) => {
    setView(selectedView);
  }

  const getView = () => {
    if(view === 'global') {
      return <GlobalView/>
    } else if (view === 'markets') {
      return <MarketsView/>
    } else if (view === 'crypto') {
      return <CryptoView/>
    }
  }

  const cryptoCallback = (selectedCrypto) => {
    setCryptoId(selectedCrypto);
    setView('markets');
  }

  const onCloseMarketViewCallback = () => {
    setView('crypto');
  }

  return (
    <>
    <div className='root-container'>
    <Header parentCallback={headerCallback}/>

      <div className={view === 'global' ? 'content-container' : 'content-container hidden'}>
      <GlobalView/>
      </div>

      {view === 'markets' && <div className={'content-container'}>
      <MarketsView coinId={cryptoId} parentCallback={onCloseMarketViewCallback}/>
      </div>}

      <div className={view === 'crypto' ? 'content-container' : 'content-container hidden'}>
      <CryptoView parentCallback={cryptoCallback}/>
      </div>

    </div>
    </>
  )
}

export default App
