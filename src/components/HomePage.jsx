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
import "../../images/iteration-2-images/pictures/food-1.png"
import "../../images/iteration-2-images/pictures/food-2.png"
import "../../images/iteration-2-images/pictures/food-3.png"

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
      <div className='two-cards'>
        <div className='hack'>
        <h2>Hackathlon Burger Menü</h2>
        <button onClick={onButtonClick}>SİPARİŞ VER</button>
        </div>
        <div className='kurye'>
        <h2>Çoooooook hızlı npm gibi kurye</h2>
        <button onClick={onButtonClick}>SİPARİŞ VER</button>
        </div>
      </div>
    </section>
    <div className='medium-body'>
      <p>en çok paketlenen menüler</p>
      <p>Acıktıran Kodlara Doyuran Lezzetler</p>
    </div>
    <nav className='mb-icons'>
      <ul className='mb-icon-lists'>
        <li className='mb-icon-items'>
          <img src="../../images/iteration-2-images/icons/1.svg"/>
          <span>YENİ! Kore</span>
        </li>
        <li className='mb-icon-items'>
          <img src="../../images/iteration-2-images/icons/2.svg"/>
          <span>Pizza</span>
        </li>
        <li className='mb-icon-items'>
          <img src="../../images/iteration-2-images/icons/3.svg"/>
          <span>Burger</span>
        </li>
        <li className='mb-icon-items'>
          <img src="../../images/iteration-2-images/icons/4.svg"/>
          <span>Kızartmalar</span>
        </li>
        <li className='mb-icon-items'>
          <img src="../../images/iteration-2-images/icons/5.svg"/>
          <span>Fast Food</span>
        </li>
        <li className='mb-icon-items'>
          <img src="../../images/iteration-2-images/icons/6.svg"/>
          <span>Gazlı İçecek</span>
        </li>
      </ul>
    </nav>
    <div className='md-images'>
    <img src="../../images/iteration-2-images/pictures/food-1.png"/>
    <p>Terminal Pizza </p>
    <p>4.9</p> <p>200</p> <p>120₺</p>
    <img src="../../images/iteration-2-images/pictures/food-2.png"/>
    <p>Position Absolute Acı Pizza </p>
    <p>4.9</p> <p>1000</p> <p>150₺</p>
    <img src="../../images/iteration-2-images/pictures/food-3.png"/>
    <p>Terminal Pizza </p>
    <p>4.9</p> <p>500</p> <p>130₺</p>
    </div>
    </>
  )
}

export default HomePage