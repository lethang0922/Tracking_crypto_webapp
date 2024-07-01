import React from 'react'
import "./styles.css"
function CoinInfo({ heading, desc }) {
  return (
    <div className='grey-wrapper'>
      <h2 className='coin-info-heading'> {heading}</h2>
      <p className='coin-info-desc'>{desc}</p>
    </div>
  )
}

export default CoinInfo