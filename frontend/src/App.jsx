import { useState } from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import './App.css'
import Navbar from './Components/Navbar/Navbar'
import Home from './Pages/Home'
import ShopCategory from './Pages/ShopCategory'
import Product from './Pages/Product'
import Cart from './Pages/Cart'
import LoginSignup from './Pages/LoginSignup'

function App() {
  return (
    <>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/samsung' element={<ShopCategory brand='samsung'/>}/>
        <Route path='/apple' element={<ShopCategory brand='apple'/>}/>
        <Route path='/xiaomi' element={<ShopCategory brand='xiaomi'/>}/>
        <Route path='/sony' element={<ShopCategory brand='sony'/>}/>
        <Route path='/vivo' element={<ShopCategory brand='vivo'/>}/>
        <Route path='/product' element={<Product/>}>
          <Route path=':productId' element={<Product/>}/>
        </Route>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/login' element={<LoginSignup/>}/>
       </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
