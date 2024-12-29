import React, { useState } from 'react';
import { pizzaData } from '../sahteVeri';
import { Form, FormGroup, Label } from 'reactstrap';
import "../css/OrderPizza.css"
import "../../images/iteration-1-images/logo.svg"
import axios from 'axios';

function OrderPizza({goBack, onSuccess}) {
  const [order, setOrder] = useState({ selectedExtras: [] });
  const [selectedDough, setSelectedDough] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [count, setCount] = useState(1);
  const [ad, setAd] = useState('');
  const [error, setError] = useState('');

  const { name, price, description, rating, reviewCount } = pizzaData[0];

  const extras = [
    "Sosis", "Pepperoni", "Mozzarella Peyniri", "Biber", "Soğan", "Mısır", 
    "Zeytin", "Sucuk", "Roka", "Mantar", "Domates", "Tavuk Izgara", "Ananas", "Fesleğen"
  ];

  const handleSizeChange = (event) => {
    setSelectedSize(event.target.value);
  };

  const handleDoughChange = (event) => {
    setSelectedDough(event.target.value);
  };

  const handleNameChange = (event) => {
    setAd(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (ad.length < 3) {
      setError("İsim en az 3 karakter olmalıdır.");
      return;
    }
    setError("");

    const orderData = {
      name: ad,
      size: selectedSize,
      dough: selectedDough,
      extras: order.selectedExtras,
      count: count,
      price: price + getExtrasPrice() + getSizePrice(),
    };

    axios.post('https://reqres.in/api/pizza', orderData)
      .then(response => {
        console.log('Gelen Yanıt:', response.data);
        alert("Sipariş başarıyla gönderildi!");
        
        setOrder({ selectedExtras: [] });
        setSelectedSize('');
        setSelectedDough('');
        setCount(1);
        setAd('');
        onSuccess();
      })
      .catch(error => {
        console.error('API isteği sırasında bir hata oluştu:', error);
        alert("Sipariş gönderilirken bir hata oluştu.");
      });
  };

  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    setOrder((prevOrder) => {
      const selectedExtras = prevOrder.selectedExtras;
      let updatedExtras;

      if (selectedExtras.includes(value)) {
        updatedExtras = selectedExtras.filter((extra) => extra !== value);
      } else {
        if (selectedExtras.length < 10) {
          updatedExtras = [...selectedExtras, value];
        } else {
          updatedExtras = selectedExtras;
        }
      }

      return { ...prevOrder, selectedExtras: updatedExtras };
    });
  };

  const increment = () => setCount(count + 1);
  const decrement = () => { if (count > 0) setCount(count - 1); };

  const getSizePrice = () => {
    if (selectedSize === 'small') return 30;
    if (selectedSize === 'medium') return 50;
    if (selectedSize === 'large') return 70;
    return 0;
  };

  const getExtrasPrice = () => order.selectedExtras.length * 5;

  const total = (price + getSizePrice() + getExtrasPrice()) * count;

  const isFormValid = () => {
    return (
      selectedSize !== '' &&
      selectedDough !== '' &&
      count > 0 &&
      order.selectedExtras.length > 0 && 
      order.selectedExtras.length <= 10
    );
  };

  return (
    <>
      <header>
        <img src="../../images/iteration-1-images/logo.svg" alt="Logo" />
        <div className="order-header">
          <button onClick={goBack}>Anasayfa</button>
          <button>Seçenekler</button>
          <button>Sipariş Oluştur</button>
        </div>
      </header>

      <section>
        <div className="pizza-info">
          <h3>{name}</h3>
          <div className="pizza-details">
            <p>{price}₺</p>
            <div className="rating">
              <p>{rating}</p>
              <p>({reviewCount})</p>
            </div>
          </div>
          <p>{description}</p>
        </div>

        <Form onSubmit={handleSubmit}>
          <FormGroup className="pizza-sizes">
          <div className="selection-container">
          <div className="size-selection">
            <Label className="size-header">
              <h3>Boyut Seç</h3></Label>
            <div className="pizza-size-selection">
              <input type="radio" id="small" name="size" value="small" onChange={handleSizeChange} />
              <label htmlFor="small">Küçük</label>
              <input type="radio" id="medium" name="size" value="medium" onChange={handleSizeChange} />
              <label htmlFor="medium">Orta</label>
              <input type="radio" id="large" name="size" value="large" onChange={handleSizeChange} />
              <label htmlFor="large">Büyük</label>
            </div>
            </div>

            <div className="dough-selection">
            <Label className="dough-sizes">
              <h3>Hamur Seç</h3></Label>
            <select value={selectedDough} onChange={handleDoughChange}>
              <option value="">Hamur Kalınlığı</option>
              <option value="İnce">İnce</option>
              <option value="Normal">Normal</option>
              <option value="Kalın">Kalın</option>
            </select>
            </div>
            </div>
            

            <div className="extras">
              <h3>Ek Mazemeler</h3>
              <p>En fazla 10 malzeme seçebilirsiniz. 5₺</p>
            </div>
            <div className="extras-selection">
              {extras.map((extra) => (
                <div key={extra}>
                  <input
                    type="checkbox"
                    id={extra}
                    value={extra}
                    onChange={handleCheckboxChange}
                    checked={order.selectedExtras.includes(extra)}
                  />
                  <label htmlFor={extra}>{extra}</label>
                </div>
              ))}
            </div>

            <div>
              <label htmlFor="ad">İsim:</label>
              <input
                type="text"
                id="ad"
                name="ad"
                value={ad}
                onChange={handleNameChange}
                minLength={3}
                required
              />
              {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>

            <h3>Sipariş Notu</h3>
            <label htmlFor="note">
              <textarea id="note" name="note" rows="4" cols="50" placeholder="Siparişine eklemek istediğin bir not var mı?" />
            </label>

            <hr />
            <div className="count-order">
              <div className="counter">
                <button onClick={decrement} className="decrement">-</button>
                <span className="count">{count}</span>
                <button onClick={increment} className="increment">+</button>
                <fieldset className='order-details'>
                  <h3>Sipariş Toplamı</h3>
                  <div className="extra-price">
                    <p>Seçimler:</p> <p>{getExtrasPrice()} ₺</p>
                  </div>
                  <div className="total-price">
                  <p>Toplam:</p><p> {total} ₺</p>
                  </div>
                </fieldset>
                <button type="submit" disabled={!isFormValid()}>SİPARİŞ VER</button>
              </div>
            </div>
          </FormGroup>
        </Form>
      </section>
    </>
  );
}

export default OrderPizza;
