import React from 'react'
import "../css/HomePage.css"
import "../../images/iteration-2-images/icons/1.svg"
import "../../images/iteration-2-images/icons/2.svg"
import "../../images/iteration-2-images/icons/3.svg"
import "../../images/iteration-2-images/icons/4.svg"
import "../../images/iteration-2-images/icons/5.svg"
import "../../images/iteration-2-images/icons/6.svg"
import "../../images/iteration-2-images/cta/kart-1.png"
import "../../images/iteration-2-images/cta/kart-2.png"
import "../../images/iteration-2-images/cta/kart-3.png"

function HomePage({onButtonClick}) {
  return (
    <>
    <div className="home-h1">
    <img src="../../images/iteration-1-images/logo.svg"/>
    </div>
    <div className='home-h2'>
      <p>fırsatı kaçırma</p> 
    <h2>KOD ACIKTIRIR</h2> 
    <h2>PİZZA, DOYURUR</h2>
    </div>
    <div className='home-button'>
      <button data-cy="home-button" onClick={onButtonClick}> ACIKTIM </button>
    </div>
    <nav className='home-icons'>
      <ul className='icon-lists'>
        <li className='icon-items'>
          <img src="../../images/iteration-2-images/icons/1.svg"/>
          <span>YENİ! Kore</span>
        </li>
        <li className='icon-items'>
          <img src="../../images/iteration-2-images/icons/2.svg"/>
          <span>Pizza</span>
        </li>
        <li className='icon-items'>
          <img src="../../images/iteration-2-images/icons/3.svg"/>
          <span>Burger</span>
        </li>
        <li className='icon-items'>
          <img src="../../images/iteration-2-images/icons/4.svg"/>
          <span>Kızartmalar</span>
        </li>
        <li className='icon-items'>
          <img src="../../images/iteration-2-images/icons/5.svg"/>
          <span>Fast Food</span>
        </li>
        <li className='icon-items'>
          <img src="../../images/iteration-2-images/icons/6.svg"/>
          <span>Gazlı İçecek</span>
        </li>
      </ul>
    </nav>
    <section className='cards'>
      <div className='lezzetus'>
        <h1>Özel Lezzetus</h1>
        <p>Position: Absolute Acı Burger</p>
        <button onClick={onButtonClick}>SİPARİŞ VER</button>

      </div>
      <img src="../../images/iteration-2-images/cta/kart-1.png"/>
      <img src="../../images/iteration-2-images/cta/kart-2.png"/>
      <img src="../../images/iteration-2-images/cta/kart-3.png"/>
    </section>
    </>
  )
}

export default HomePage