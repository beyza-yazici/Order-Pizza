import React, { useState } from 'react';
import { pizzaData } from '../sahteVeri';
import { Form, FormGroup, Label } from 'reactstrap';
import "../css/OrderPizza.css"
import "../../images/iteration-1-images/logo.svg"

function OrderPizza({goBack}) {
  const [order, setOrder] = useState({ selectedExtras: [] });
  const [selectedDough, setSelectedDough] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [count, setCount] = useState(1);

  const { name, price, description, rating, reviewCount } = pizzaData[0];

  const extras = [
    "Sosis",
    "Pepperoni",
    "Mozzarella Peyniri",
    "Biber",
    "Soğan",
    "Mısır",
    "Zeytin",
    "Sucuk",
    "Roka",
    "Mantar",
    "Domates",
    "Tavuk Izgara",
    "Ananas",
    "Fesleğen"
  ];

  const handleChange = (event) => {
    setSelectedSize(event.target.value);
    setSelectedDough(event.target.value);
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

  const increment = (event) => {
    event.preventDefault();
    setCount(count + 1);
  };

  const decrement = (event) => {
    event.preventDefault();
    if (count > 0) {
      setCount(count - 1);
    }
  };

  
  const getSizePrice = () => {
    if (selectedSize === 'small') return 30;
    if (selectedSize === 'medium') return 50;
    if (selectedSize === 'large') return 70;
    return 0;
  };

  const getExtrasPrice = () => {
    return order.selectedExtras.length * 5;
  };

  const total = (price + getSizePrice() + getExtrasPrice()) * count;

  const isFormValid = () => {
    const isSizeSelected = (selectedSize !== '');
    const isDoughSelected = (selectedDough !== '');
    
    const isExtrasValid = (order.selectedExtras.length) <= 10;

    const isCountValid = count > 0;
  };

  return (
    <>
      <header>
        <img src="../../images/iteration-1-images/logo.svg" alt="" />
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
            <p>{rating}</p>
            <p>({reviewCount})</p>
          </div>
          <p>{description}</p>
        </div>
        <Form>
          <FormGroup className="pizza-sizes">
            <Label>Boyut Seç</Label>
            <div>
              <input type="radio" id="small" name="size" value="small" onChange={handleChange} />
              <label htmlFor="small">Küçük</label>
              <input type="radio" id="medium" name="size" value="medium" onChange={handleChange} />
              <label htmlFor="medium">Orta</label>
              <input type="radio" id="large" name="size" value="large" onChange={handleChange} />
              <label htmlFor="large">Büyük</label>
            </div>
            <Label>Hamur Seç</Label>
            <select value={selectedDough} onChange={handleChange}>
              <option value="">Hamur Kalınlığı</option>
              <option value="İnce">İnce</option>
              <option value="Normal">Normal</option>
              <option value="Kalın">Kalın</option>
            </select>
            <div>
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
            <h3>Sipariş Notu</h3>
            <label htmlFor='note'>
              <textarea id="note" name='note' rows="4" cols="50" placeholder='Siparişine eklemek istediğin bir not var mı?' />
            </label>
            <hr />
            <div className='count-order'>
              <div className="counter">
                <button onClick={decrement} className="decrement">-</button>
                <span className="count">{count}</span>
                <button onClick={increment} className="increment">+</button>
                <fieldset>
                  <h3>Sipariş Toplamı</h3>
                  <p>Seçimler: {getExtrasPrice()} ₺</p>
                  <p>Toplam: {total} ₺</p>
                </fieldset>
                <button type='submit' disabled={!isFormValid}>SİPARİŞ VER</button>
              </div>
            </div>
          </FormGroup>
        </Form>
      </section>
    </>
  );
}

export default OrderPizza;
