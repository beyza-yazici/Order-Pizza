import React, { useState } from 'react';
import { pizzaData } from '../sahteVeri';
import { Button, Form, FormGroup, Label } from 'reactstrap';
import "../css/OrderPizza.css"
import "../../images/iteration-1-images/logo.svg"
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function OrderPizza({ goBack, onSuccess }) {
  const [order, setOrder] = useState({ selectedExtras: [] });
  const [selectedDough, setSelectedDough] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [count, setCount] = useState(1);
  const [ad, setAd] = useState('');

  const { name, price, description, rating, reviewCount } = pizzaData[0];

  const sizeOptions = [
    { value: 'Küçük', label: 'Küçük', price: 30 },
    { value: 'Orta', label: 'Orta', price: 50 },
    { value: 'Büyük', label: 'Büyük', price: 70 },
  ];

  const doughOptions = [
    { value: 'İnce', label: 'İnce' },
    { value: 'Normal', label: 'Normal' },
    { value: 'Kalın', label: 'Kalın' },
  ];

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
      toast.error("İsim en az 3 karakter olmalıdır.");
      return;
    }

    if (selectedSize === '') {
      toast.error("Lütfen bir boyut seçiniz.");
      return;
    }

    if (selectedDough === '') {
      toast.error("Lütfen bir hamur kalınlığı seçiniz.");
      return;
    }

    if (order.selectedExtras.length < 4) {
      toast.error("Lütfen en az 4 ekstra malzeme seçiniz.");
      return;
    }

    const orderData = {
      name: ad,
      size: selectedSize,
      dough: selectedDough,
      extras: order.selectedExtras,
      count: count,
      price: price + getExtrasPrice() + getSizePrice(),
      getExtrasPrice: function () {
        return this.extras.length * 5;
      }
    };

    axios.post('https://reqres.in/api/pizza', orderData)
      .then(response => {
        console.log('Gelen Yanıt:', response.data);

        setOrder({ selectedExtras: [] });
        setSelectedSize('');
        setSelectedDough('');
        setCount(1);
        setAd('');
        onSuccess(orderData);
        toast.success("Siparişiniz başarıyla alındı!");
      })
      .catch(error => {
        console.error('API isteği sırasında bir hata oluştu:', error);
        toast.error('Lütfen ilgili alanları doldurunuz.');
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
    const sizeOption = sizeOptions.find(option => option.value === selectedSize);
    return sizeOption ? sizeOption.price : 0;
  };

  const getExtrasPrice = () => order.selectedExtras.length * 5;

  const total = (price + getSizePrice() + getExtrasPrice()) * count;

  return (
    <div>
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
              <Label className="size-header">
                <h3 className="required">Boyut Seç</h3>
              </Label>
              {sizeOptions.map(({ value, label }) => (
                <div className="pizza-size-selection" key={value}>
                  <input
                    type="radio"
                    id={value}
                    name="size"
                    value={value}
                    onChange={handleSizeChange}
                    checked={selectedSize === value}
                  />
                  <label htmlFor={value}>{label}</label>
                </div>
              ))}
            </div>
          </FormGroup>

          <FormGroup className="dough-selection">
            <h3 className="required">Hamur Seç</h3>
            <select value={selectedDough} onChange={handleDoughChange}>
              <option value="">Hamur Kalınlığı</option>
              {doughOptions.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </FormGroup>

          <FormGroup className="extras">
            <h3>Ek Mazemeler</h3>
            <p>(En az 4 malzeme seçiniz.) Ekstra malzeme: 5₺</p>

            <div className="extras-selection">
              {extras.map((extra) => (
                <div className='extra' key={extra}>
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
            {order.selectedExtras.length < 4 && (
              <p style={{ color: 'red' }}>Lütfen en az 4 ekstra malzeme seçiniz.</p>
            )}
            {order.selectedExtras.length >= 10 && (
              <p style={{ color: 'red' }}>En fazla 10 malzeme seçebilirsiniz.</p>
            )}
          </FormGroup>

          <FormGroup className="ad">
            <label htmlFor="ad">
              <h3>İsim : </h3>
            </label>
            <input
              data-cy="ad"
              type="text"
              id="ad"
              name="ad"
              value={ad}
              onChange={handleNameChange}
              minLength={3}
              required
              placeholder="Lütfen isminizi giriniz."
            />
          </FormGroup>

          <FormGroup className="note">
            <h3>Sipariş Notu</h3>
            <label htmlFor="note">
              <input id="note" name="note" placeholder="Siparişine eklemek istediğin bir not var mı?" />
            </label>
          </FormGroup>

          <hr />
          <div className="count-order">
            <FormGroup>
              <div className="counter">
                <Button onClick={decrement} className="decrement">-</Button>
                <span className="count">{count}</span>
                <Button onClick={increment} className="increment">+</Button>
              </div>
            </FormGroup>

            <FormGroup className="order-details">
              <h3>Sipariş Toplamı</h3>
              <div className="extra-price">
                <p>Seçimler:</p> <p>{getExtrasPrice()} ₺</p>
              </div>
              <div className="total-price">
                <p>Toplam:</p><p> {total} ₺</p>
              </div>
              <Button type="submit">SİPARİŞ VER</Button>
            </FormGroup>
          </div>
        </Form>
      </section>

      <ToastContainer />
    </div>
  );
}

export default OrderPizza;
