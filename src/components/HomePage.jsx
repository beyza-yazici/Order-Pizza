import React from 'react'
import "../css/HomePage.css"

function HomePage({onButtonClick}) {
  return (
    <>
    <div className="home-h1">
    <img src="../../images/iteration-1-images/logo.svg" alt="" />
    </div>
    <div className='home-h2'> 
    <h2>KOD ACIKTIRIR</h2> 
    <h2>PİZZA, DOYURUR</h2>
    </div>
    <div className='home-button'>
      <button onClick={onButtonClick}> ACIKTIM </button>
    </div>
    </>
  )
}

export default HomePage