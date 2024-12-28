import React, { useState } from 'react';
import { pizzaData } from '../sahteVeri';
import { Form, FormGroup, Label } from 'reactstrap';

function OrderPizza() {
  const [order, setOrder] = useState({ selectedExtras: [] });
  const [selectedDough, setSelectedDough] = useState('');
  const [selectedSize, setSelectedSize] = useState('');

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

  // Boyut ve hamur seçimi için handleChange fonksiyonu
  const handleChange = (event) => {
    setSelectedSize(event.target.value);
    setSelectedDough(event.target.value);
  };

  // Ek malzeme seçiminde kullanılan fonksiyon
  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    setOrder((prevOrder) => {
      const selectedExtras = prevOrder.selectedExtras;
      let updatedExtras;

      // Eğer ek malzeme zaten seçildiyse, onu listeden çıkar
      if (selectedExtras.includes(value)) {
        updatedExtras = selectedExtras.filter((extra) => extra !== value);
      } else {
        // Eğer ek malzeme seçilmediyse, listeye ekle
        updatedExtras = [...selectedExtras, value];
      }

      // Seçilen ek malzemeler güncelleniyor
      return { ...prevOrder, selectedExtras: updatedExtras };
    });
  };

  return (
    <>
      <header>
        <h1>Teknolojik Yemekler</h1>
        <div className="order-header">
          <button>Anasayfa</button>
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
                    checked={order.selectedExtras.includes(extra)} // Seçili mi kontrolü
                  />
                  <label htmlFor={extra}>{extra}</label>
                </div>
              ))}
            </div>
          </FormGroup>
        </Form>
      </section>
    </>
  );
}

export default OrderPizza;
