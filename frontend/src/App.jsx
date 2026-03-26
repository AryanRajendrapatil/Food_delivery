import { useState } from 'react'

import './App.css'
import Navbar from './components/navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home.jsx'
import Placeorder from './pages/placeorder/Placeorder.jsx'
import Cart from './pages/cart/Cart.jsx'
import Footer from './components/Footer/Footer.jsx'
import Loginpopup from './components/loginpopup/Loginpopup.jsx'
import Verify from './pages/verify/Verify.jsx'
import Myorders from './pages/myorders/Myorders.jsx'
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import axios from 'axios'
function App() {
  const [count, setCount] = useState(0)
  const [showLogin,setShowLogin] = useState(false)


  return (
    <>
    {showLogin ? <Loginpopup setShowLogin={setShowLogin} /> : <></>}
<div className="app">
  <Navbar setShowLogin={setShowLogin} />
  <Routes>
  <Route path='/' element={<Home />} />
  <Route path='/placeorder' element={<Placeorder />} />
  <Route path='/cart' element={<Cart />} />
  <Route path='/login' element={<Loginpopup />} />
  <Route path='/verify' element={<Verify />} />
  <Route path='/myorders' element={<Myorders />} />
  </Routes>
  
  
</div>
<Footer />
</>



  )
}

export default App
