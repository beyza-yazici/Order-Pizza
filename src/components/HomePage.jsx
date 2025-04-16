import React, { useRef } from 'react'
import { Link } from 'react-router-dom';
import "../css/HomePage.css"
import "/images/1.svg"
import "/images/2.svg"
import "/images/3.svg"
import "/images/4.svg"
import "/images/5.svg"
import "/images/6.svg"
import "/images/kart-1.png"
import "/images/kart-2.png"
import "/images/kart-3.png"
import "/images/food-1.png"
import "/images/food-2.png"
import "/images/food-3.png"

function HomePage() {

  const mdImagesRef = useRef(null);

  const handleScroll = () => {
    if (mdImagesRef.current) {
      mdImagesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <div className="home-page">
      <div className="home-h1">
        <img src="/images/logo.svg" alt="Logo" />
      </div>
      <div className="home-h2">
        <p>fırsatı kaçırma</p>
        <h2>KOD ACIKTIRIR</h2>
        <h2>PİZZA, DOYURUR</h2>
      </div>
      <div className="home-button">
        <Link to="/order-pizza">
          <button data-cy="home-button"> ACIKTIM </button>
        </Link>
      </div>
    <nav className='home-icons'>
      <ul className='icon-lists'>
        <li className='icon-items' onClick={handleScroll}> 
          <img src="/images/1.svg"/>
          <span>YENİ! Kore</span>
        </li>
        <li className='icon-items' onClick={handleScroll}>
          <img src="/images/2.svg"/>
          <span>Pizza</span>
        </li>
        <li className='icon-items' onClick={handleScroll}>
          <img src="/images/3.svg"/>
          <span>Burger</span>
        </li>
        <li className='icon-items' onClick={handleScroll}>
          <img src="/images/4.svg"/>
          <span>Kızartmalar</span>
        </li>
        <li className='icon-items' onClick={handleScroll}>
          <img src="/images/5.svg"/>
          <span>Fast Food</span>
        </li>
        <li className='icon-items' onClick={handleScroll}>
          <img src="/images/6.svg"/>
          <span>Gazlı İçecek</span>
        </li>
      </ul>
    </nav>
    <div className="home-cta">
    <section className='cards'>
      <div className='lezzetus'>
        <h1>Özel Lezzetus</h1>
        <p>Position: Absolute Acı Burger</p>
        <Link to="/order-pizza">
        <button>SİPARİŞ VER</button>
        </Link>
      </div>
      <div className='two-cards'>
        <div className='hack'>
        <h2>Hackathlon Burger Menü</h2>
        <Link to="/order-pizza">
        <button>SİPARİŞ VER</button>
        </Link>
        </div>
        <div className='kurye'>
        <h2>Çoooooook hızlı npm gibi kurye</h2>
        <Link to="/order-pizza">
        <button>SİPARİŞ VER</button>
        </Link>
        </div>
      </div>
    </section>
    <div className='medium-body'>
      <p>en çok paketlenen menüler</p>
      <p>Acıktıran Kodlara Doyuran Lezzetler</p>
    </div>
    <nav className='mb-icons'>
      <ul className='mb-icon-lists'>
        <li className='mb-icon-items' onClick={handleScroll}>
          <img src="/images/1.svg"/>
          <span>Ramen</span>
        </li>
        <li className='mb-icon-items' onClick={handleScroll}>
          <img src="/images/2.svg"/>
          <span>Pizza</span>
        </li>
        <li className='mb-icon-items' onClick={handleScroll}>
          <img src="/images/3.svg"/>
          <span>Burger</span>
        </li>
        <li className='mb-icon-items' onClick={handleScroll}>
          <img src="/images/4.svg"/>
          <span>Kızartmalar</span>
        </li>
        <li className='mb-icon-items' onClick={handleScroll}>
          <img src="/images/5.svg"/>
          <span>Fast Food</span>
        </li>
        <li className='mb-icon-items' onClick={handleScroll}>
          <img src="/images/6.svg"/>
          <span>Gazlı İçecek</span>
        </li>
      </ul>
    </nav>
    <div className='md-images' ref={mdImagesRef}>
    <div className="item">
    <img src="/images/food-1.png"/>
    <h4>Terminal Pizza </h4>
    <p><span>4.9</span><span>200</span><span>120₺</span></p>
    </div>
    <div className="item">
    <img src="/images/food-2.png"/>
    <h4>Position Absolute Acı Pizza </h4>
    <p><span>4.9</span><span>1000</span><span>150₺</span></p>
    </div>
    <div className="item">
    <img src="/images/food-3.png"/>
    <h4>useEffect Tavuklu Burger </h4>
    <p><span>4.9</span><span>500</span><span>130₺</span></p>
    </div>
    </div>
    </div>
    </div>
  )
}

export default HomePage