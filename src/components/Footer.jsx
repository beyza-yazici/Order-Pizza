import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import "../../images/iteration-2-images/footer/logo-footer.svg";
import "../../images/iteration-2-images/footer/icons/icon-1.png";
import "../../images/iteration-2-images/footer/icons/icon-2.png";
import "../../images/iteration-2-images/footer/icons/icon-3.png";
import "../../images/iteration-2-images/footer/insta/li-0.png";
import "../../images/iteration-2-images/footer/insta/li-1.png";
import "../../images/iteration-2-images/footer/insta/li-2.png";
import "../../images/iteration-2-images/footer/insta/li-3.png";
import "../../images/iteration-2-images/footer/insta/li-4.png";
import "../../images/iteration-2-images/footer/insta/li-5.png";
import "../css/Footer.css";

function Footer() {
  return (
    <div className="footer">
      <div className="footer-first">
    <div className="footer-logo">
    <img src="../../images/iteration-2-images/footer/logo-footer.svg" alt="Logo" />
    </div>
    <div className="footer-icons">
    <div className="footer-info-item">
      <img src="../../images/iteration-2-images/footer/icons/icon-1.png" alt="Address Icon" />
      <span>341 Londonderry Road, Istanbul Türkiye</span>
    </div>
    <div className="footer-info-item">
      <img src="../../images/iteration-2-images/footer/icons/icon-2.png" alt="Email Icon" />
      <span>aciktim@teknolojikyemekler.com</span>
    </div>
    <div className="footer-info-item">
      <img src="../../images/iteration-2-images/footer/icons/icon-3.png" alt="Phone Icon" />
      <span>+90 216 123 45 67</span>
    </div>
    </div>
    </div>

      <div className="footer-menu">
        <h5>Hot Menu</h5>
        <p>Terminal Pizza</p>
        <p>5 Kişilik Hackathlon Pizza</p>
        <p>useEffect Tavuklu Pizza</p>
        <p>Beyaz Console Frosty</p>
        <p>Testler Geçti Mutlu Burger</p>
        <p>Position Absolute Acı Burger</p>
      </div>
      <div className="footer-social">
        <h5>Instagram</h5>
        <div className="footer-social-icons">
          <img src="../../images/iteration-2-images/footer/insta/li-0.png" alt="Instagram Image 1" />
          <img src="../../images/iteration-2-images/footer/insta/li-1.png" alt="Instagram Image 2" />
          <img src="../../images/iteration-2-images/footer/insta/li-2.png" alt="Instagram Image 3" />
          <img src="../../images/iteration-2-images/footer/insta/li-3.png" alt="Instagram Image 4" />
          <img src="../../images/iteration-2-images/footer/insta/li-4.png" alt="Instagram Image 5" />
          <img src="../../images/iteration-2-images/footer/insta/li-5.png" alt="Instagram Image 6" />
        </div>
      </div>
      <div className="footer-end">
        <p>2023 Teknolojik Yemekler.</p>
        <FontAwesomeIcon icon={faTwitter} style={{ color: "#ffffff" }} />
      </div>
    </div>
  );
}

export default Footer;
