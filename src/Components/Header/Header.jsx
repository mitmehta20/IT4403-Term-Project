import React from 'react'
import './Header.css'

const Header = ( { parentCallback } ) => {

    const onHeaderClick = (event) => {
        parentCallback(event.target.value);
    }

  return (
    <div className='full-header-container'>
        <div className='header-items'>
            <div className='header-title'>IT4403 Term Project</div>
            <div className='header-navigation'>
                <div className='nav-item'><button value='global' onClick={onHeaderClick}>Global Stats</button></div>
                <div className='nav-item'><button value='crypto' onClick={onHeaderClick}>View Crypto</button></div>
            </div>
        </div>
    </div>
  )
}

export default Header