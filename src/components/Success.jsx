import React from "react";
import "../../images/iteration-1-images/logo.svg";
import "../css/Success.css";

function SuccessPage({ orderDetails }) {

    const getExtrasPrice = () => order.selectedExtras.length * 5;
    
    return (
        <div className="success-page">
            <div className="logo">
                <img src="../../images/iteration-1-images/logo.svg" alt="logo" />
            </div>
            <div className="success-message">
            <p className="lezzet">lezzetin yolda</p>
                <p className="onay">SİPARİŞ ALINDI</p>
                <hr />
            <div className="order-sum">
                <h4>Position Absolute Acı Pizza</h4>
            <div className="order-selection">
                <p>Boyut: <strong>{orderDetails.size}</strong></p>
                <p>Hamur: <strong>{orderDetails.dough}</strong></p>
                <p>Ek Malzemeler: <strong>{orderDetails.extras.join(', ')}</strong></p>
                </div>
                <div className="order-sum-card">
                    <h5>Sipariş Toplamı</h5>
                <p><strong>Seçimler: </strong> {orderDetails.getExtrasPrice}</p>
                <p><strong>Toplam: {orderDetails.price}₺ </strong></p>
                </div>
                </div>
            </div>
            </div>
    );
}

export default SuccessPage;
