import { useState } from 'react'

import './App.css'
import Navbar from './components/navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home.jsx'
import Placeorder from './pages/placeorder/Placeorder.jsx'
import Cart from './pages/cart/Cart.jsx'
function App() {
  const [count, setCount] = useState(0)

  return (
<div className="app">
  <Navbar />
  <Routes>
  <Route path='/' element={<Home />} />
  <Route path='/placeorder' element={<Placeorder />} />
  <Route path='/cart' element={<Cart />} />
  </Routes>
  
</div>




  )
}

export default App
