import React, { useState, useEffect } from 'react';
import { pizzaData } from '../sahteVeri';
import { Button, Form, FormGroup, Label } from 'reactstrap';
import "../css/OrderPizza.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import "/images/form-banner.png"

function OrderPizza({ onSuccess }) {

  const history = useHistory();

  const initialFormState = {
    ad: '',
    selectedSize: '',
    selectedDough: '',
    selectedExtras: [],
    count: 1,
    note: ''
  };

  const initialErrors = {
    ad: '',
    selectedSize: '',
    selectedDough: '',
    selectedExtras: '',
  };

  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState(initialErrors);
  const [totalPrice, setTotalPrice] = useState(0);

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

  const validate = (name, value) => {
    switch (name) {
      case 'ad':
        if (value.length < 3) {
          toast.error("İsim en az 3 karakter olmalıdır.");
          return "İsim en az 3 karakter olmalıdır.";
        }
        return '';
      case 'selectedSize':
        if (!value) {
          toast.error("Lütfen bir boyut seçiniz.");
          return "Lütfen bir boyut seçiniz.";
        }
        return '';
      case 'selectedDough':
        if (!value) {
          toast.error("Lütfen bir hamur kalınlığı seçiniz.");
          return "Lütfen bir hamur kalınlığı seçiniz.";
        }
        return '';
      case 'selectedExtras':
        if (value.length < 4) {
          toast.error("En az 4 ekstra malzeme seçmelisiniz.");
          return "En az 4 ekstra malzeme seçmelisiniz.";
        }
        if (value.length > 10) {
          toast.error("En fazla 10 ekstra malzeme seçebilirsiniz.");
          return "En fazla 10 ekstra malzeme seçebilirsiniz.";
        }
        return '';
      default:
        return '';
    }
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    if (type === 'checkbox') {
      setFormData((prevData) => {
        const updatedExtras = checked
          ? [...prevData.selectedExtras, value]
          : prevData.selectedExtras.filter((extra) => extra !== value);
        return { ...prevData, selectedExtras: updatedExtras };
      });
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }

    const errorMessage = validate(name, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMessage,
    }));
  };

  useEffect(() => {
    const sizePrice = getSizePrice();
    const extrasPrice = getExtrasPrice();
    const updatedTotalPrice = (price + sizePrice + extrasPrice) * formData.count;
    setTotalPrice(updatedTotalPrice);
  }, [formData, price]);

  const increment = () => setFormData(prev => ({ ...prev, count: prev.count + 1 }));
  const decrement = () => { 
    if (formData.count > 0) setFormData(prev => ({ ...prev, count: prev.count - 1 }));
  };

  const getSizePrice = () => {
    const sizeOption = sizeOptions.find(option => option.value === formData.selectedSize);
    return sizeOption ? sizeOption.price : 0;
  };

  const getExtrasPrice = () => formData.selectedExtras.length * 5;

  const handleSubmit = (e) => {
    e.preventDefault();

    const finalErrors = {
      ad: validate('ad', formData.ad),
      selectedSize: validate('selectedSize', formData.selectedSize),
      selectedDough: validate('selectedDough', formData.selectedDough),
      selectedExtras: validate('selectedExtras', formData.selectedExtras),
    };

    if (Object.values(finalErrors).some((error) => error)) {
      setErrors(finalErrors);
      return;
    }

    const orderData = {
      name: formData.ad,
      size: formData.selectedSize,
      dough: formData.selectedDough,
      extras: formData.selectedExtras,
      count: formData.count,
      price: totalPrice,
    };

    axios.post('https://reqres.in/api/pizza', orderData)
      .then(response => {
        console.log('Gelen Yanıt:', response.data);
        setFormData(initialFormState);
        onSuccess(orderData);
        toast.success("Siparişiniz başarıyla alındı!");
        history.push('/success');
      })
      .catch(error => {
        console.error('API isteği sırasında bir hata oluştu:', error);
        toast.error('Lütfen ilgili alanları doldurunuz.');
      });
  };

  return (
    <div className='order-pizza'>
      <header>
        <img src="/images/logo.svg" alt="Logo" />
        <img src="/images/form-banner.png"/>
        <div className="order-header">
          <Button onClick={() => history.push('/')}>Anasayfa</Button>
          <Button>Seçenekler</Button>
          <Button>Sipariş Oluştur</Button>
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
                    name="selectedSize"
                    value={value}
                    onChange={handleChange}
                    checked={formData.selectedSize === value}
                  />
                  <label htmlFor={value}>{label}</label>
                </div>
              ))}
            </div>
          </FormGroup>

          <FormGroup className="dough-selection">
            <h3 className="required">Hamur Seç</h3>
            <select
              name="selectedDough"
              value={formData.selectedDough}
              onChange={handleChange}
            >
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
                <div className="extra" key={extra}>
                  <input
                    type="checkbox"
                    id={extra}
                    value={extra}
                    name="selectedExtras"
                    onChange={handleChange}
                    checked={formData.selectedExtras.includes(extra)}
                  />
                  <label htmlFor={extra}>{extra}</label>
                </div>
              ))}
            </div>
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
              value={formData.ad}
              onChange={(e) => setFormData({ ...formData, ad: e.target.value })}
              onBlur={(e) => {
                const errorMessage = validate('ad', e.target.value);
                setErrors((prevErrors) => ({
                  ...prevErrors,
                  ad: errorMessage,
                }));
              }}
              minLength={3}
              required
              placeholder="Lütfen isminizi giriniz."
              className={errors.ad ? "input-error" : ""}
            />
            {errors.ad && <p className="error-message">{errors.ad}</p>}
          </FormGroup>

          <FormGroup className="note">
            <h3>Sipariş Notu</h3>
            <label htmlFor="note">
              <input
                id="note"
                name="note"
                placeholder="Siparişine eklemek istediğin bir not var mı?"
                value={formData.note}
                onChange={handleChange}
              />
            </label>
          </FormGroup>

          <hr />
          <div className="count-order">
            <FormGroup>
              <div className="counter">
                <Button onClick={decrement} className="decrement">-</Button>
                <span className="count">{formData.count}</span>
                <Button onClick={increment} className="increment">+</Button>
              </div>
            </FormGroup>

            <FormGroup className="order-details">
              <h3>Sipariş Toplamı</h3>
              <div className="extra-price">
                <p>Seçimler:</p> <p>{getExtrasPrice()} ₺</p>
              </div>
              <div className="total-price">
                <p>Toplam Fiyat:</p>
                <p>{totalPrice} ₺</p>
              </div>
            </FormGroup>

            <FormGroup>
              <Button type="submit" className="order-button">Sipariş Ver</Button>
            </FormGroup>
          </div>
        </Form>
        <ToastContainer />
      </section>
    </div>
  );
}

export default OrderPizza;
