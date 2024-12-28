import { useState } from 'react'
import './App.css'
import HomePage from './components/HomePage'
import OrderPizza from './components/OrderPizza';

function App() {

  const [currentPage, setCurrentPage] = useState(false);

  return (
    <div>
      {!currentPage ? (
        <HomePage onButtonClick={() => setCurrentPage(true)} />
      ) : (
        <OrderPizza goBack={() => setCurrentPage(false)} />
      )}
    </div>
  );
}

export default App
