import React, { useState, useEffect } from 'react';
import { pizzaData } from '../sahteVeri';
import { Button, Form, FormGroup, Label } from 'reactstrap';
import "../css/OrderPizza.css";
import "../../images/iteration-1-images/logo.svg";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function OrderPizza({ goBack, onSuccess }) {

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
          return "İsim en az 3 karakter olmalıdır.";
        }
        return '';
      case 'selectedSize':
        if (!value) {
          return "Lütfen bir boyut seçiniz.";
        }
        return '';
      case 'selectedDough':
        if (!value) {
          return "Lütfen bir hamur kalınlığı seçiniz.";
        }
        return '';
      case 'selectedExtras':
        if (value.length < 4) {
          return "En az 4 ekstra malzeme seçmelisiniz.";
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

  const handleBlur = (event) => {
    const { name, value } = event.target;

    const errorMessage = validate(name, value);

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMessage,
    }));

    if (errorMessage) {
      toast.error(errorMessage);
    }
  };

  useEffect(() => {
    const sizePrice = getSizePrice();
    const extrasPrice = getExtrasPrice();
    const updatedTotalPrice = (price + sizePrice + extrasPrice) * formData.count;
    setTotalPrice(updatedTotalPrice);
  }, [formData, price]);

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
      price: price + getExtrasPrice() + getSizePrice(),
    };

    axios.post('https://reqres.in/api/pizza', orderData)
      .then(response => {
        console.log('Gelen Yanıt:', response.data);
        setFormData(initialFormState);
        onSuccess(orderData);
        toast.success("Siparişiniz başarıyla alındı!");
      })
      .catch(error => {
        console.error('API isteği sırasında bir hata oluştu:', error);
        toast.error('Lütfen ilgili alanları doldurunuz.');
      });
  };

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
                    name="selectedSize"
                    value={value}
                    onChange={handleChange}
                    checked={formData.selectedSize === value}
                  />
                  <label htmlFor={value}>{label}</label>
                </div>
              ))}
            </div>
            {errors.selectedSize && <div className="error-message">{errors.selectedSize}</div>}
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
            {errors.selectedDough && <div className="error-message">{errors.selectedDough}</div>}
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
            {errors.selectedExtras && <div className="error-message">{errors.selectedExtras}</div>}
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
              onChange={handleChange}
              onBlur={handleBlur}
              minLength={3}
              required
              placeholder="Lütfen isminizi giriniz."
            />
            {errors.ad && <div className="error-message">{errors.ad}</div>}
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

          <Button type="submit">Siparişi Gönder</Button>
        </Form>

        <div className="total-price">
          <h3>Toplam Fiyat: {totalPrice}₺</h3>
        </div>
      </section>

      <ToastContainer />
    </div>
  );
}

export default OrderPizza;
