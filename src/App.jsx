import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import HomePage from './components/HomePage';
import OrderPizza from './components/OrderPizza';
import Success from './components/Success';
import Footer from './components/Footer';

function App() {
  const [isOrderSuccess, setIsOrderSuccess] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);

  const handleOrderSuccess = (orderData) => {
    setOrderDetails(orderData);
    setIsOrderSuccess(true);
  };

  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={() => <HomePage />} />
          <Route
            path="/order-pizza"
            component={() => <OrderPizza onSuccess={handleOrderSuccess} />}
          />
          <Route
            path="/success"
            component={() => <Success orderDetails={orderDetails} />}
          />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
