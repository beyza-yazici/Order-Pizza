import React from "react";
import "../../images/iteration-1-images/logo.svg";
import "../css/Success.css";

function SuccessPage({ orderDetails }) {

    const getExtrasPrice = () => {
        return orderDetails.extras.length * 5;
    };

    const getTotalPrice = () => {
        return orderDetails.price + getExtrasPrice();
    };

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
                        <p>Boyut: <strong>{orderDetails.size}</strong></p>
                        <p>Hamur: <strong>{orderDetails.dough}</strong></p>
                        <p>Ek Malzemeler: <strong>{orderDetails.extras.join(', ')}</strong></p>
                    </div>
                    <div className="order-sum-card">
                        <h5>Sipariş Toplamı</h5>
                        <div>
                            <p><strong>Seçimler: </strong><p>{getExtrasPrice()}₺</p></p>
                        </div>
                        <div>
                            <p><strong>Toplam:  </strong><p>{getTotalPrice()}₺</p></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SuccessPage;
