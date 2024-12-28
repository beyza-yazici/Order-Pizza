import { useState } from 'react'
import './App.css'
import HomePage from './components/HomePage'
import OrderPizza from './components/OrderPizza';

function App() {

  const [currentPage, setCurrentPage] = useState(false);
  const [isOrderSuccess, setIsOrderSuccess] = useState(false);

  const handleOrderSuccess = () => {
    setIsOrderSuccess(true);
  };

  return (
    
    <div className={currentPage ? 'order-pizza-page' : ''}>
      {!currentPage ? (
        <HomePage onButtonClick={() => setCurrentPage(true)} />
      ) : isOrderSuccess ? (
        <div>
          <h2>Siparişiniz başarıyla alındı!</h2>
          <p>Teşekkür ederiz. Siparişiniz işleniyor.</p>
        </div>
      ) : (
        <OrderPizza goBack={() => setCurrentPage(false)} onSuccess={handleOrderSuccess} />
      )}
    </div>
  );
}

export default App
