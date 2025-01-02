import React from 'react';
import { useState } from 'react'
import './App.css'
import HomePage from './components/HomePage'
import OrderPizza from './components/OrderPizza';
import Success from './components/Success';

function App() {

  const [currentPage, setCurrentPage] = useState(false);
  const [isOrderSuccess, setIsOrderSuccess] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);

  const handleOrderSuccess = (orderData) => {
    setOrderDetails(orderData);
    setIsOrderSuccess(true);
  };

  return (
    <div className={currentPage ? 'order-pizza-page' : ''}>
      {!currentPage ? (
        <HomePage onButtonClick={() => setCurrentPage(true)} />
      ) : isOrderSuccess ? (
        <Success goBack={() => setCurrentPage(false)} orderDetails={orderDetails}/>
      ) : (
        <OrderPizza goBack={() => setCurrentPage(false)} onSuccess={handleOrderSuccess} />
      )}
    </div>
  );
}

export default App
