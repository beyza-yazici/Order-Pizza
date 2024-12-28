import { useState } from 'react'
import './App.css'
import HomePage from './components/HomePage'
import OrderPizza from './components/OrderPizza';

function App() {

  const [currentPage, setCurrentPage] = useState("HomePage");

  const changePage = (page) => {
    setCurrentPage(page);
  };
  
  return (
    <>
    <OrderPizza />
    </>
  )
}

export default App
