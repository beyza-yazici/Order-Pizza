import React from "react";
import { useHistory } from "react-router-dom"; 
import "../../images/iteration-1-images/logo.svg";
import "../css/Success.css";

function SuccessPage({ orderDetails }) {
  const history = useHistory(); 

  const getExtrasPrice = () => orderDetails.extras.length * 5;
  const getTotalPrice = () => orderDetails.price + getExtrasPrice();

  return (
    <div className="success-page">
      <div className="logo">
        <img src="../../images/iteration-1-images/logo.svg" alt="logo" />
      </div>
      <div className="success-message">
        <p className="lezzet">Lezzetin Yolda!</p>
        <p className="onay">SİPARİŞ ALINDI</p>
        <hr />
        <div className="order-sum">
          <h4>Position Absolute Acı Pizza</h4>
          <div className="order-selection">
            <p>
              Boyut: <strong>{orderDetails.size}</strong>
            </p>
            <p>
              Hamur: <strong>{orderDetails.dough}</strong>
            </p>
            <p>
              Ek Malzemeler: <strong>{orderDetails.extras.join(", ")}</strong>
            </p>
          </div>
          <div className="order-sum-card">
            <h5>Sipariş Toplamı</h5>
            <div>
              <p>
                <strong>Seçimler: </strong>
                {getExtrasPrice()}₺
              </p>
            </div>
            <div>
              <p>
                <strong>Toplam: </strong>
                {getTotalPrice()}₺
              </p>
            </div>
          </div>
        </div>
        <button
          className="back-home-button"
          onClick={() => history.push("/")}
        >
          Ana Sayfa
        </button>
      </div>
    </div>
  );
}

export default SuccessPage;
